"use client";

import { redirect, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProblemsTable } from '@/components/ProblemsTable';
import { useProblems } from '@/hooks/useProblems';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import isAuth from '@/components/isAuthenticated';

export default isAuth(ProblemsPage);

function ProblemsPage() {
    const { user, loading, isLoggedIn } = useUser();
    const { problems } = useProblems();
    const router = useRouter();

    return (
        <>
            <div className="dark:bg-neutral-900 min-h-screen h-full space-y-6 p-16 pb-16 md:block">
                <h1 className="font-bold text-4xl text-center">Challenges</h1>
                <Separator />
                {/* <div className="grid grid-cols-5">
                    <Select>
                        <SelectTrigger className="w-[180px] dark:bg-neutral-700">
                            <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-neutral-700">
                            <SelectItem value="light">Easy</SelectItem>
                            <SelectItem value="dark">Medium</SelectItem>
                            <SelectItem value="system">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px] dark:bg-neutral-700">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-neutral-700">
                            <SelectItem value="light">Incomplete</SelectItem>
                            <SelectItem value="dark">Solved</SelectItem>
                            <SelectItem value="system">Unattempted</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px] dark:bg-neutral-700">
                            <SelectValue placeholder="Tags" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-neutral-700">
                            <SelectItem value="light">Array</SelectItem>
                            <SelectItem value="dark">DSA</SelectItem>
                            <SelectItem value="system">Strings</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input type="text" className="col-span-2 dark:bg-neutral-700" placeholder="Search questions..." />

                </div> */}

                <ProblemsTable problems={problems ?? []} />
            </div>
        </>
    )
}