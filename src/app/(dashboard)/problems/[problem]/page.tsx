"use client";

import { Card } from "@/components/ui/card";
import { UserProfile, useProfile } from "@/hooks/useProfile";
import { Badge } from "@/components/ui/badge";
import CodeEditor from "@/components/CodeEditor";
import Markdown from 'react-markdown'
import { useProblem } from "@/hooks/useProblem";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { API_ROUTES } from "@/lib/routes";
import Terminal, { TerminalLine, TerminalLineType } from "@/components/Terminal";
import { LuChevronDown, LuLoader2, LuTerminal } from "react-icons/lu";

export interface TestResult {
    label: string;
    passed: boolean;
    test: string; // add(1, 5) == 22
    message: string;
}

export default function Page({ params }: { params: { problem: string } }) {
    const { problem } = useProblem(params.problem);
    const [code, setCode] = useState('// write some code');
    const [terminalText, setTerminalText] = useState<TerminalLine[]>([
        { user: "user", content: "", type: TerminalLineType.COMMAND }
    ]);

    const [executing, setExecuting] = useState(false);
    const [terminalVisible, setTerminalVisible] = useState(false);

    function delay(s: number) {
        return new Promise((res, rej) => {
            return setTimeout(res, s);
        })
    }

    async function handleProblemRun() {
        if (!code) return;
        setTerminalVisible(true);
        setTerminalText([{ user: "user", content: "running test cases...", type: TerminalLineType.OUTPUT}]);
        setExecuting(true);
        await delay(2000);
        const out = await axios.post(API_ROUTES.PROBLEMS.RUN_POST(params.problem), {
            code: code,
            language: "js"
        }, {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) as AxiosResponse<{ message?: string; success: boolean; results: TestResult[]}>;
        setExecuting(false);

        let processedOutput: TerminalLine[] = out.data.results.map((e) => {
            return {
                user: "user",
                content: e,
                type: TerminalLineType.TEST
            }
        });

        
        if (!out.data.success) {
            processedOutput.push({ user: "user", content: out.data?.message || "an error occured.", type: TerminalLineType.ERROR})
        }
        processedOutput.push({ user: "user", content: "", type: TerminalLineType.COMMAND })

        setTerminalText((existing) => [...existing, ...processedOutput]);
    }

    return (
        <>
            <div className="space-y-1 p-5 pb-16 md:block">
                <div className="grid grid-cols-3 gap-3">
                    <div className="overflow-hidden word-break-all white-space-wrap col-span-1 rounded-lg bg-neutral-900 h-[80vh] p-5 ring-2 ring-inset ring-neutral-500">
                        <h1 className="text-2xl font-semibold">{problem?.title ?? <Skeleton className="w-5" />}</h1>
                        <Badge>{problem?.difficulty ?? 'Unknown'}</Badge>
                        <Markdown className="max-h-[90%] overflow-y-scroll overflow-x-hidden word-break-all white-space-wrap mt-5 pb-3 prose dark:prose-invert">{problem?.description ?? "*This problem is being loaded.*"}</Markdown>
                    </div>
                    <div className="col-span-2 flex flex-col gap-3 h-[80vh]">
                        <div className="relative rounded-lg bg-neutral-900 font-mono min-h-[50%] h-full p-2 ring-2 ring-inset ring-neutral-500 hover:ring-amber-300 transition-shadow ease-in-out">
                            <CodeEditor code={code} setCode={setCode} />
                            <div className="flex gap-2 absolute bottom-4 right-4">
                                <Button onClick={handleProblemRun} variant="ghost" disabled={executing}>{executing && <LuLoader2 className="animate-spin mr-2 h-4 w-4" /> }Run</Button>
                                <Button variant="default" disabled={executing}>Submit</Button>
                                { !terminalVisible && <Button onClick={() => setTerminalVisible(true)} variant="secondary"><LuTerminal/></Button>}
                            </div>
                        </div>
                        { terminalVisible && 
                            <div className="rounded-lg bg-neutral-900 font-mono ring-2 ring-inset ring-green-500 h-[50%] p-5 relative">
                                <Button disabled={executing} onClick={() => setTerminalVisible(false)} className="absolute top-4 right-4" variant="secondary"><LuChevronDown/></Button>
                                <h1 className="text-amber-500 font-semibold font-sans">• Terminal</h1>
                                <Terminal output={terminalText} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
  }