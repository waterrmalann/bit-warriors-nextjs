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
import QuestionCard from './_components/QuestionCard';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
    const { user, loading, isLoggedIn, logout } = useUser();
    const { problems } = useProblems();
    const router = useRouter();

    async function handleLogout() {
        try {
            await logout();
        } finally {
            router.replace('/login');
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/login");
        }
    }, [])

    if (loading) {
        return (
            <div className="text-center h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        )
    }

    if (!isLoggedIn) {
        return null;
    }

    return (
        <>
            <div className="space-y-6 p-16 pb-16 md:block">
                <QuestionCard />
                <Separator />
                <h1 className="font-bold text-xl">Challenges</h1>
                <div className="grid grid-cols-5">

                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Easy</SelectItem>
                            <SelectItem value="dark">Medium</SelectItem>
                            <SelectItem value="system">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Incomplete</SelectItem>
                            <SelectItem value="dark">Solved</SelectItem>
                            <SelectItem value="system">Unattempted</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Tags" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Array</SelectItem>
                            <SelectItem value="dark">DSA</SelectItem>
                            <SelectItem value="system">Strings</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input type="text" className="col-span-2" placeholder="Search questions..." />

                </div>

                <ProblemsTable problems={problems ?? []} />
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </>
    )
}