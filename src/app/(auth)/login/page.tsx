"use client";

import useUser from "@/app/hooks/useUser";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useRef } from "react";
// import axios from "@/app/config/axios.config";

export default function LoginPage() {
    const router = useRouter();
    const { user, refetch } = useUser();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function loginHandler() {
        try {
            const res = await axios.post(
                "http://localhost:3002/login",
                {
                    username: usernameRef.current?.value,
                    password: passwordRef.current?.value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log(res.data);
            refetch();
            router.push('/home');
        } catch (e) {
            console.error(e);
        }
    }

    if (user?.isLoggedIn) {
        redirect('/home');
    }

    return (
        <>
            <Link
                href="/register"
                className="absolute right-4 top-4 md:right-8 md:top-8"
            >
                Signup
            </Link>
            <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Login to your account.
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password below to login.
                    </p>
                </div>
                <div>
                    <form className="flex flex-col gap-y-2 w-[400px] m-auto items-center">
                        <input
                            ref={usernameRef}
                            placeholder="Username"
                            name="username"
                            type="text"
                        />
                        <input
                            ref={passwordRef}
                            placeholder="Password"
                            name="password"
                            type="password"
                        />
                        <button type="button" onClick={() => loginHandler()}>
                            Log in
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