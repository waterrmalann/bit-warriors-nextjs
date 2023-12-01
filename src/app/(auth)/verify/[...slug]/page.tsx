"use client";

import { useToast } from "@/components/ui/use-toast";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { LuLoader2 } from "react-icons/lu";

export default function VerifyEmailPage() {
    const { toast } = useToast();
    const pathname = usePathname();
    const { trigger } = useVerifyEmail(pathname);
    const router = useRouter();

    const verifyEmail = async () => {
        const { data, error } = await trigger();
        if (error) {
            if (error.response?.data.message !== 'user is already email verified') {
                toast({
                    variant: "warning",
                    title: "An error occured.",
                    description: "Could not verify email address."
                });
            }
            router.push('/login');
        } else {
            toast({
                title: "Email has been successfully verified."
            });
            router.push('/login');
        }
    };

    useEffect(() => {
        verifyEmail();
    }, []);

    return (
        <>
            <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Verifiyng your email.
                    </h1>
                    <p className="text-sm text-muted-foreground">
                    Your email address is being verified.
                    </p>
                    <h1 className="text-2xl text-center mx-auto"><LuLoader2 className="mr-2 h-4 w-4 animate-spin" /></h1>
                </div>
            </div>
        </>
    );
}