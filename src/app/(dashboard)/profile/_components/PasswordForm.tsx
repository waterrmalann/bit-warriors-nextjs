"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { API_ROUTES } from "@/lib/routes"
import axios, { AxiosResponse } from "axios"
import { useState } from "react"
import { LuLoader2 } from "react-icons/lu"

const passwordFormSchema = z.object({
    oldPassword: z.string(),
    newPassword: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>

interface PasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
    username: string | null;
}

export function PasswordForm({ username }: PasswordFormProps) {
    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        mode: "onChange",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function onSubmit(data: PasswordFormValues) {
        try {
            setIsSubmitting(true);
            const res = await axios.put(API_ROUTES.PROFILE.PASSWORD_PUT(username ?? ''), data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, // get cookies
            }) as AxiosResponse;
            if (res.status === 204) {
                toast({
                    variant: "success",
                    title: "Password Update",
                    description: "You have updated your password."
                });
                // todo: form.reset();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: "destructive",
                    title: "An error occured.",
                    description: error.response?.data.message ?? error.message
                });
                console.group("(Axios Error): [PasswordForm.tsx] onSubmit()");
                console.error(error);
                console.groupEnd();
            } else {
                throw error;
            }
        } finally {
            setIsSubmitting(false);
        }

        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input className="dark:bg-neutral-800" type="password" placeholder="existing password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter in your current password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid md:grid-cols-2 md:gap-6">
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input className="dark:bg-neutral-800" type="password" placeholder="new password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter in a new password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input className="dark:bg-neutral-800" type="password" placeholder="Confirm new password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
            <input className="dark:bg-neutral-800" type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input className="dark:bg-neutral-800" type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
        </div>
    </div> */}

                <Button disabled={username === null || isSubmitting} type="submit">
                    {isSubmitting && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />} 
                    Change Password
                </Button>
            </form>
        </Form>
    )
}