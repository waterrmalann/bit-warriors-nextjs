"use client";

import { useUser } from '@/hooks/useUser';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import isAuth from '@/components/isAuthenticated';
import { useProfile } from '@/hooks/useProfile';
import { SubmissionsTable } from './_components/SubmissionsTable';

export default isAuth(SubmissionsPage);

function SubmissionsPage() {
    const { user, loading, isLoggedIn } = useUser();
    const { recentSubmissions } = useProfile(user?.username || '');

    return (
        <>
            <div className="dark:bg-neutral-900 min-h-screen h-full space-y-6 p-16 pb-16 md:block">
                <h1 className="font-bold text-4xl text-center">My Submissions</h1>
                <Separator />
                <SubmissionsTable submissions={recentSubmissions ?? []} />
            </div>
        </>
    )
}