"use client";

import { redirect, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
    const { user, loading, isLoggedIn, logout } = useUser();
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
        <div className="mx-auto h-screen flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome @{user?.username}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        You are logged in to {user?.email}
                    </p>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </>
    )
}