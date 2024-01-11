"use client"; 

import React from 'react'
import { PasswordForm } from './_components/PasswordForm'
import { LuChevronLeft } from 'react-icons/lu';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProfileForm } from './_components/ProfileForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

const Page = () => {
    const { user } = useUser();

    return (
        <div className="dark:bg-neutral-900 min-h-screen h-full space-y-6 p-16 pb-16 md:block">
            <Link href="/home"><Button variant="ghost"><LuChevronLeft className="mr-2 h-4 w-4" /> Back</Button></Link>
            <Card className="dark:bg-neutral-900">
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your account settings and set e-mail preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                    { !user && <Skeleton className="w-[100px] h-[50px] rounded-full" /> }
                    { user && <ProfileForm defaultValues={
                        {
                            username: user.username,
                            email: user.email,
                            bio: user.bio,
                            clan: user.clan,
                            githubUsername: user.githubUsername,
                            linkedInUsername: user.linkedInUsername,
                            xUsername: user.xUsername,
                            personalWebsite: user.personalWebsite
                        }
                    }/>}
                </CardContent>
            </Card>
            <Card className="dark:bg-neutral-900">
                <CardHeader>
                    <CardTitle>Password Settings</CardTitle>
                    <CardDescription>Change your existing password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <PasswordForm username={user?.username ?? null}/>
                </CardContent>
                <CardFooter>
                    <p className="text-muted-foreground text-sm">It&apos;s a good idea to change your password as often as every 6 months.</p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page