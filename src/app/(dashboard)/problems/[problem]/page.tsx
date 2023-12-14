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
import { LuLoader2 } from "react-icons/lu";

export interface TestResult {
    label: string;
    passed: boolean;
    message: string;
}

export default function Page({ params }: { params: { problem: string } }) {
    const { problem } = useProblem(params.problem);
    const [code, setCode] = useState('// write some code');
    const [terminalText, setTerminalText] = useState<TerminalLine[]>([
        { user: "user", content: "", type: TerminalLineType.COMMAND }
    ]);

    const [executing, setExecuting] = useState(false);

    async function handleProblemRun() {
        if (!code) return;

        setExecuting(true);
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

        processedOutput.unshift({ user: "user", content: "running test cases...", type: TerminalLineType.OUTPUT})
        if (!out.data.success) {
            processedOutput.push({ user: "user", content: out.data?.message || "an error occured.", type: TerminalLineType.ERROR})
        }
        processedOutput.push({ user: "user", content: "", type: TerminalLineType.COMMAND })

        setTerminalText(processedOutput);
    }

    return (
        <>
            <div className="space-y-1 p-10 pb-16 md:block">
                <h1>{problem?.title ?? <Skeleton className="w-5" />}</h1>
                <Badge>{problem?.difficulty ?? 'Unknown'}</Badge>
                <div>Tabs</div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1 rounded-lg bg-neutral-900 h-[70vh] p-5">
                        <h1 className="text-2xl font-semibold">{problem?.title ?? <Skeleton className="w-5" />}</h1>
                        <Markdown className="prose dark:prose-invert">{problem?.description ?? "*This problem is being loaded.*"}</Markdown>

                    </div>
                    <div className="col-span-2 flex flex-col gap-3 h-[70vh]">
                        <div className="relative rounded-lg bg-neutral-900 font-mono h-[60%] p-2">
                            <CodeEditor code={code} setCode={setCode} />
                            <div className="flex gap-2 absolute bottom-4 right-4">
                                <Button onClick={handleProblemRun} variant="ghost" disabled={executing}>{executing && <LuLoader2 className="animate-spin mr-2 h-4 w-4" /> }Run</Button>
                                <Button variant="default" disabled={executing}>Submit</Button>
                            </div>
                        </div>
                        <div className="rounded-lg bg-neutral-900 font-mono  h-[40%] p-5">
                            <Terminal output={terminalText} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  }