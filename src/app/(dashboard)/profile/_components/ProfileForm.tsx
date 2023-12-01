"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import axios, { AxiosResponse } from "axios"
import { API_ROUTES } from "@/lib/routes"

const profileFormSchema = z.object({
    username: z
        .string()
        .min(3, {
            message: "Username must be at least 3 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    clan: z
        .string()
        .optional(),
    email: z
        .string()
        .email(),
    bio: z.string().max(160).min(4).optional(),

    githubUsername: z.string().max(39).optional(),
    linkedInUsername: z.string().max(100).optional(),
    xUsername: z.string().max(15).optional(),
    personalWebsite: z.string().url().optional().or(z.literal('')),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultValues: Partial<ProfileFormValues>;
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(data: ProfileFormValues) {
        try {
            const res = await axios.put(API_ROUTES.PROFILE.PUT(defaultValues.username!), data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, // get cookies
            }) as AxiosResponse;
            if (res.status === 204) {
                toast({
                    variant: "success",
                    title: "Profile Update",
                    description: "You have updated your profile information."
                });
                // todo: useUser().mutate()
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: "destructive",
                    title: "An error occured.",
                    description: error.message
                });
                console.group("(Axios Error): [ProfileForm.tsx] onSubmit()");
                console.error(error);
                console.groupEnd();
            } else {
                throw error;
            }
        }

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 md:gap-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="@username" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name. It can be your real name or a
                                    pseudonym.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="clan"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Clan</FormLabel>
                                <FormControl>
                                    <Input placeholder="warriors" {...field} />
                                </FormControl>
                                <FormDescription>
                                    If set, you will be allied with users with the same clan.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="mail@example.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    You cannot change a verified email address.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span>@mention</span> other users and organizations to
                                link to them.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />
                <h4 className="text-xl font-semibold leading-none tracking-tight">Profile Links</h4>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <FormField
                        control={form.control}
                        name="githubUsername"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Github Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="linkedInUsername"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="xUsername"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>X (Formerly Twitter) Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="personalWebsite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Personal Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}