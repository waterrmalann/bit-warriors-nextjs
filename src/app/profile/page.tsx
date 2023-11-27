import React from 'react'
import { PasswordForm } from './_components/PasswordForm'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProfileForm } from './_components/ProfileForm'

const page = () => {
    return (
        <div className="space-y-6 p-10 pb-16 md:block">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your account settings and set e-mail preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Password Settings</CardTitle>
                    <CardDescription>Change your existing password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <PasswordForm/>
                </CardContent>
                <CardFooter>
                    <p className="text-muted-foreground text-sm">It&apos;s a good idea to change your password as often as every 6 months.</p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page