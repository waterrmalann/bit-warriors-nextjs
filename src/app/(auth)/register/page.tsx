"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import Link from "next/link";
// import axios from "../../config/axios.config";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { API_ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import useRegister from "@/hooks/useRegister";
import { LuGithub, LuLoader2 } from 'react-icons/lu';
import { getGithubOAuthURL } from "@/lib/utils";

function RegisterPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { isLoggedIn } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const { trigger } = useRegister();

    useEffect(() => {
        if (isLoggedIn) {
            router.replace("/home");
        }
    }, [])

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function githubHandler(e: React.SyntheticEvent) {
        e.preventDefault();
        const url = getGithubOAuthURL();
        router.push(url);
    }

    async function registerHandler(e: React.SyntheticEvent) {
        e.preventDefault();

        toast({ variant: "warning", title: "Registration Disabled.", description: "Registration is currently disabled to thwart spam, check login page" });
        return;
        
        // const username = usernameRef.current?.value;
        // const email = emailRef.current?.value;
        // const password = passwordRef.current?.value;

        // if (!username || username.length < 4) {
        //     toast({
        //         variant: "warning",
        //         title: "Enter in a valid username."
        //     });
        //     return;
        // }
        // if (!email) {
        //     toast({
        //         variant: "warning",
        //         title: "Enter in a valid email address."
        //     });
        //     return;
        // }
        // if (!password || password.length < 8) {
        //     toast({
        //         variant: "warning",
        //         title: "Password must be atleast 8 characters long."
        //     });
        //     return;
        // }

        // setIsLoading(true);
        // const { data, error } = await trigger(username, email, password);
        // setIsLoading(false);
        // if (error) {
        //     toast({
        //         variant: "destructive",
        //         title: "An error occured",
        //         description: error.message
        //     });
        // } else {
        //     toast({
        //         title: "Email Verification",
        //         description: "You should receive a link to verify your email address."
        //     });
        //     router.push('/login');
        // }
    }

    return (
        <>
            <Link href="/login" className="absolute right-4 top-4 md:right-8 md:top-8">
                Log in
            </Link>
            <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email below to create your account
                    </p>
                </div>
                <div>
                    <form onSubmit={registerHandler}>
                        <div className="grid gap-3">
                            <div className="grid gap-1">
                                <Label className="sr-only" htmlFor="username">
                                    Username
                                </Label>
                                <Input className="dark:bg-neutral-800 my-1"
                                    id="username"
                                    placeholder="username"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="username"
                                    autoCorrect="off"
                                    disabled={false}
                                    ref={usernameRef}
                                />

                                <Label className="sr-only" htmlFor="email">
                                    Email
                                </Label>
                                <Input className="dark:bg-neutral-800 my-1"
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={false}
                                    ref={emailRef}
                                />

                                <Label className="sr-only" htmlFor="password">
                                    Password
                                </Label>
                                <Input className="dark:bg-neutral-800 my-1"
                                    id="password"
                                    placeholder="password"
                                    type="password"
                                    autoCapitalize="none"
                                    autoComplete="password"
                                    autoCorrect="off"
                                    disabled={false}
                                    ref={passwordRef}
                                />
                            </div>
                            <Button disabled={isLoading} type="submit">
                                {isLoading && (
                                    <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Sign In with Email
                            </Button>
                        </div>
                    </form>
                    <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="px-2 dark:bg-neutral-900 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="grid my-2">
                        <Button onClick={githubHandler} className="dark:bg-neutral-900" variant="outline" type="button" disabled={isLoading}>
                            {isLoading ? (
                                <LuLoader2 className="animate-spin mr-2 h-4 w-4" />
                            ) : (
                                <LuGithub className="mr-2 h-4 w-4" />
                            )}{" "}
                            Github
                        </Button>
                    </div>

                </div>
                <p className="px-8 text-center text-sm text-muted-foreground items-center">
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

export default RegisterPage;