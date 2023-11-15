"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { LuLoader2 } from 'react-icons/lu';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";

interface AdminAuthForm extends React.HTMLAttributes<HTMLDivElement> { }

export function AdminAuthForm({ className, ...props }: AdminAuthForm) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const emailRef = React.useRef<HTMLInputElement | null>(null);
    const passphraseRef = React.useRef<HTMLInputElement | null>(null);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true);

        const email = emailRef.current?.value;
        const passphrase = passphraseRef.current?.value;
        if (email && passphrase) {
            try {
                const res = await axios.post("http://localhost:4000/login", {
                    email: email,
                    passphrase: passphrase
                });

                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            ref={emailRef}
                        />
                        <Label className="sr-only" htmlFor="password">
                            Passphrase
                        </Label>
                        <Input
                            id="password"
                            placeholder="multi word passphrase"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="h-16 my-2"
                            ref={passphraseRef}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Log In
                    </Button>
                </div>
            </form>
        </div>
    )
}