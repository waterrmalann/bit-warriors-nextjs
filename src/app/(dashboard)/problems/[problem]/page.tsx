"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UserProfile, useProfile } from "@/hooks/useProfile";
import { Badge } from "@/components/ui/badge";
import CodeEditor from "@/components/CodeEditor";
import QuickTip from "@/components/QuickTip";
import Markdown from "react-markdown";
import { useProblem } from "@/hooks/useProblem";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosResponse } from "axios";
import { API_ROUTES } from "@/lib/routes";
import Terminal, {
    TerminalLine,
    TerminalLineType,
} from "@/components/Terminal";
import {
    LuCheckCircle,
    LuChevronDown,
    LuLoader2,
    LuMemoryStick,
    LuTerminal,
    LuThumbsDown,
    LuThumbsUp,
    LuTimer,
} from "react-icons/lu";
import { cn } from "@/lib/utils";

export interface TestResult {
    label: string;
    passed: boolean;
    test: string; // add(1, 5) == 22
    message: string;
}

interface TestResponse {
    message?: string;
    success: boolean;
    results: TestResult[];
}

interface SubmissionResponse {
    message?: string;
    success: boolean;
    runtime: string;
    memory: string;
    results: TestResult[];
    totalTests: number;
    testsPassed: number;
    submissionId: string;
}

export default function Page({ params }: { params: { problem: string } }) {
    const { problem } = useProblem(params.problem);
    const [code, setCode] = useState("// write some code");
    const [terminalText, setTerminalText] = useState<TerminalLine[]>([
        { user: "user", content: "", type: TerminalLineType.COMMAND },
    ]);
    const [aiFeedback, setAIFeedback] = useState('');
    const [submission, setSubmission] = useState<{runtime: string | null;memory:string|null;id:string|null}>({
        runtime: null,
        memory: null,
        id: null
    })

    const [executing, setExecuting] = useState(false);
    const [terminalVisible, setTerminalVisible] = useState(false);
    const [testsPassed, setTestsPassed] = useState<boolean | null>(null);

    const [tab, setTab] = useState("problem");

    const {toast} = useToast();

    function delay(s: number) {
        return new Promise((res, rej) => {
            return setTimeout(res, s);
        });
    }

    async function getAIFeedback() {
        if (!submission.id) return toast({
            variant: "warning",
            title: "There is no submission to receive feedback on."
        });

        setAIFeedback('*loading...*');
        const out = (await axios.post(
            //! fixme: http status mismatch
            API_ROUTES.SUBMISSION.FEEDBACK_GET(submission.id), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        )) as AxiosResponse<string>;

        setAIFeedback(out.data);
    }

    async function handleProblemSubmit() {
        if (!code) return;
        setTestsPassed(null);
        setTerminalVisible(true);
        setTerminalText([
            {
                user: "user",
                content: "submitting solution...",
                type: TerminalLineType.OUTPUT,
            },
        ]);
        setExecuting(true);
        await delay(2000);
        const out = (await axios.post(
            API_ROUTES.PROBLEMS.SUBMIT_POST(params.problem),
            {
                code: code,
                language: "js",
            },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        )) as AxiosResponse<SubmissionResponse>;
        setExecuting(false);

        let processedOutput: TerminalLine[] = [];
        if (!out.data.success) {
            // If there was an issue with code execution. (Timeout, SyntaxErrors)
            processedOutput.push({
                user: "user",
                content: out.data?.message || "an error occured.",
                type: TerminalLineType.ERROR,
            });
            processedOutput.push({
                user: "user",
                content: "all tests failed...",
                type: TerminalLineType.ERROR,
            });
            processedOutput.push({
                user: "user",
                content: "",
                type: TerminalLineType.COMMAND,
            });

            setTerminalText((existing) => [...existing, ...processedOutput]);
            return;
        }
        
        let passedTests = out.data.totalTests === out.data.testsPassed;
        setTestsPassed(() => passedTests);
        if (passedTests) {
            setTab("submissions");
            processedOutput.push({
                user: "user",
                content: `${out.data.testsPassed}/${out.data.totalTests} tests passed...`,
                type: TerminalLineType.OUTPUT,
            });
            processedOutput.push({
                user: "user",
                content: `successfully submitted...`,
                type: TerminalLineType.OUTPUT,
            });
            setSubmission({
                runtime: out.data.runtime,
                memory: out.data.memory,
                id: out.data.submissionId
            })
        } else {
            // last hit error will be shown
            processedOutput = out.data.results.map((e) => {
                return {
                    user: "user",
                    content: e,
                    type: TerminalLineType.TEST,
                };
            });
        }
        
        processedOutput.push({
            user: "user",
            content: "",
            type: TerminalLineType.COMMAND,
        });
        setTerminalText((existing) => [...existing, ...processedOutput]);
    }

    async function handleProblemRun() {
        if (!code) return;
        setTestsPassed(null);
        setTerminalVisible(true);
        setTerminalText([
            {
                user: "user",
                content: "running test cases...",
                type: TerminalLineType.OUTPUT,
            },
        ]);
        setExecuting(true);
        await delay(2000); // todo: Remove this delay.
        const out = (await axios.post(
            API_ROUTES.PROBLEMS.RUN_POST(params.problem),
            {
                code: code,
                language: "js",
            },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        )) as AxiosResponse<TestResponse>;
        setExecuting(false);

        let processedOutput: TerminalLine[] = out.data.results.map((e) => {
            return {
                user: "user",
                content: e,
                type: TerminalLineType.TEST,
            };
        });

        let totalTests = out.data.results.length;
        let passedTests = out.data.results.filter((e) => e.passed).length;

        setTestsPassed((passedTests === totalTests) && out.data.success);

        if (!out.data.success) {
            processedOutput.push({
                user: "user",
                content: out.data?.message || "an error occured.",
                type: TerminalLineType.ERROR,
            });
        }
        processedOutput.push({
            user: "user",
            content: `${passedTests}/${totalTests} tests passed...`,
            type: TerminalLineType.OUTPUT,
        });
        processedOutput.push({
            user: "user",
            content: "",
            type: TerminalLineType.COMMAND,
        });

        setTerminalText((existing) => [...existing, ...processedOutput]);
    }

    return (
        <>
            <div className="space-y-1 p-5 md:block">
                <div className="grid grid-cols-3 gap-3">
                    <Tabs
                        value={tab}
                        onValueChange={(value) => setTab(value)}
                        className="overflow-hidden word-break-all white-space-wrap col-span-1 h-[calc(100vh-7rem)"
                    >
                        {/* <Tabs defaultValue="problem" className="w-[400px]"> */}
                        <TabsList className="bg-dark">
                            <TabsTrigger value="problem">Problem</TabsTrigger>
                            <TabsTrigger value="submissions">Submissions</TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="problem"
                            className="p-5 rounded-lg bg-neutral-900 ring-2 ring-inset ring-neutral-500 h-[calc(100%-3rem)]"
                        >
                            <h1 className="text-2xl font-semibold">
                                {problem?.title ?? <Skeleton className="w-5" />}
                            </h1>
                            <div className="my-2 flex gap-3 items-center">
                                <Badge variant="easyDifficulty">
                                    {problem?.difficulty ?? "Unknown"}
                                </Badge>
                                <QuickTip tip="Solved">
                                    <LuCheckCircle className="text-green-500" />
                                </QuickTip>
                                <Button variant="ghost" className="text-muted-foreground">
                                    <LuThumbsUp className="mr-2 h-4 w-4" /> 500
                                </Button>
                                <Button variant="ghost" className="text-muted-foreground">
                                    <LuThumbsDown className="mr-2 h-4 w-4" /> 500
                                </Button>
                            </div>
                            {problem?.tags.map((e) => (
                                <Badge variant="secondary" className="mx-1 font-thin" key={e}>
                                    {e}
                                </Badge>
                            ))}
                            <Markdown className="max-h-[35rem] overflow-y-auto overflow-x-hidden word-break-all white-space-wrap mt-5 pb-3 prose dark:prose-invert">
                                {problem?.description ?? "*This problem is being loaded.*"}
                            </Markdown>
                        </TabsContent>
                        <TabsContent
                            value="submissions"
                            className="p-5 rounded-lg bg-neutral-900 ring-2 ring-inset ring-neutral-500 h-[calc(100%-3rem)]"
                        >
                            <h1 className="text-lg flex items-center gap-3 font-bold py-4">
                                <LuCheckCircle className="text-green-500" /> Solved
                            </h1>
                            <div className="grid grid-cols-2 gap-3">
                                <Card className="dark:bg-neutral-900">
                                    <CardHeader>
                                        <CardTitle className="flex gap-2 my-2"><LuTimer /> Runtime</CardTitle>
                                        <CardDescription>
                                        <strong className="text-red-500">Beats 42.00%</strong> of users with JavaScript.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{submission.runtime ?? 'N/A'}</p>
                                    </CardContent>
                                </Card>
                                <Card className="dark:bg-neutral-900">
                                    <CardHeader>
                                        <CardTitle className="flex gap-2 my-2"><LuMemoryStick/> Memory</CardTitle>
                                        <CardDescription>
                                            <strong className="text-green-500">Beats 62.45%</strong> of users with JavaScript.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{submission.memory ?? 'N/A'}</p>
                                    </CardContent>
                                </Card>
                            </div>
                            { aiFeedback.length > 1 ? (
                                <div className="bg-neutral-800 w-full h-[60%] max-h-[28rem] overflow-y-auto p-5 rounded-md mt-3">
                                    <Markdown className="dark:prose-invert prose">{aiFeedback}</Markdown>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center m-2 p-5 w-full">
                                    <Button onClick={getAIFeedback}>AI Feedback</Button>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                    {/* </div> */}
                    <div className="col-span-2 flex flex-col gap-3 h-[calc(100vh-7rem)]">
                        <Button variant="ghost">Hello</Button>
                        <div className="relative rounded-lg bg-neutral-900 font-mono min-h-[50%] h-full p-2 ring-2 ring-inset ring-neutral-500 hover:ring-amber-300 transition-shadow ease-in-out">
                            <CodeEditor code={code} setCode={setCode} />
                            <div className="flex gap-2 absolute bottom-4 right-4">
                                <Button
                                    onClick={handleProblemRun}
                                    variant="ghost"
                                    disabled={executing}
                                >
                                    {executing && (
                                        <LuLoader2 className="animate-spin mr-2 h-4 w-4" />
                                    )}
                                    Run
                                </Button>
                                <Button
                                    onClick={handleProblemSubmit}
                                    variant="default"
                                    disabled={executing || !testsPassed}
                                >
                                    Submit
                                </Button>
                                {!terminalVisible && (
                                    <Button
                                        onClick={() => setTerminalVisible(true)}
                                        variant="secondary"
                                    >
                                        <LuTerminal />
                                    </Button>
                                )}
                            </div>
                        </div>
                        {terminalVisible && (
                            <div
                                className={cn(
                                    "rounded-lg bg-neutral-900 font-mono ring-2 ring-inset h-[50%] p-5 relative overflow-y-auto",
                                    testsPassed === null
                                        ? "ring-neutral-500"
                                        : testsPassed
                                            ? "ring-green-500"
                                            : "ring-red-500"
                                )}
                            >
                                <Button
                                    disabled={executing}
                                    onClick={() => setTerminalVisible(false)}
                                    className="absolute top-4 right-4"
                                    variant="secondary"
                                >
                                    <LuChevronDown />
                                </Button>
                                <h1 className="text-amber-500 font-semibold font-sans">
                                    • Terminal
                                </h1>
                                <Terminal output={terminalText} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
