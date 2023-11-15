"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import Link from "next/link";
// import axios from "../../config/axios.config";
import { useRef } from "react";
import useUser from "@/app/hooks/useUser";

export default function RegisterPage() {
    const { user, refetch } = useUser();

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function registerHandler() {
        try {
            const res = await axios.post("http://localhost:3002/register", {
                username: usernameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            });

            console.log(res.data);
            redirect('/login');
        } catch (e) {
            console.error(e);
        }
    }

    if (user?.isLoggedIn) {
        redirect('/home');
    }

    return (
        <>
            <Link href="/login" className="absolute right-4 top-4 md:right-8 md:top-8">
                Log in
            </Link>
            <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email below to create your account
                    </p>
                </div>
                <div>
                    <form className="flex flex-col gap-y-2">
                        <input ref={usernameRef} placeholder="username" name="username" type="text" />
                        <input ref={emailRef} placeholder="email" name="email" type="email" />
                        <input ref={passwordRef} placeholder="password" name="password" type="password" />
                        <button type="button" onClick={() => registerHandler()}>
                            Submit
                        </button>
                    </form>
                </div>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link
                        href="/terms"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </>
    );
}