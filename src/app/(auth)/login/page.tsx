"use client";

import { useUser } from "@/hooks/useUser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { API_ROUTES } from "@/lib/routes";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import useLogin from "@/hooks/useLogin";
// import axios from "@/app/config/axios.config";

function LoginPage() {
    const { trigger } = useLogin();
    const { user, loading, mutate, isLoggedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.replace("/home");
        }
    }, [])

    const { toast } = useToast();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function loginHandler(e: React.SyntheticEvent) {
        e.preventDefault();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || username.length < 4) {
            toast({
                variant: "destructive",
                title: "Enter in a valid username."
            });
            return;
        }
        if (!password || password.length < 8) {
            toast({
                variant: "destructive",
                title: "Password must be atleast 8 characters long."
            });
            return;
        }

        const { data, error } = await trigger(username, password);
        if (error) {
            toast({
                variant: "destructive",
                title: "An error occured",
                description: error.message
            });
        } else {
            mutate();
            router.replace('/home');
        }
    }

    return (
        <>
            <Link
                href="/register"
                className="absolute right-4 top-4 md:right-8 md:top-8"
            >
                Signup
            </Link>
            <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Login to your account.
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password below to login.
                    </p>
                </div>
                <div>
                    <form onSubmit={loginHandler}>
                        <div className="grid gap-2">
                            <div className="grid gap-1">
                                <Input
                                    ref={usernameRef}
                                    placeholder="Username"
                                    name="username"
                                    type="text"
                                />
                                <Input
                                    ref={passwordRef}
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <Button type="submit">
                                Log in
                            </Button>
                        </div>
                    </form>
                </div>
                <p className="px-8 text-center text-sm text-muted-foreground w-[400px] m-auto items-center">
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

export default LoginPage;