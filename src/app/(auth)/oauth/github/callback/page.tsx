'use client';

import { API_ROUTES } from "@/lib/routes";
import axios, { Axios, AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";

const GithubOAuthCallbackPage = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function registerGithub() {
            try {
                const res = await axios.post(API_ROUTES.AUTH.REGISTER_GITHUB_POST, {
                    code: code,
                }, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true, // get cookies
                }) as AxiosResponse;
    
                if (res.status === 201) {
                    router.replace('/home');
                } else {
                    setError("An error occured.");
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occured.");
                }
                console.error(err);
            }
        }
        registerGithub();
    }, [])

    return (
        <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Your Github has been authenticated.
                </h1>
                <p className="text-sm text-muted-foreground">
                    You will be logged in.
                </p>
                {
                    error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <h1 className="text-2xl text-center mx-auto"><LuLoader2 className="mr-2 h-4 w-4 animate-spin" /></h1>
                    )
                }
            </div>
        </div>
    )
}

export default GithubOAuthCallbackPage;