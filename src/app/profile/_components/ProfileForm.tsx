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

const profileFormSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    clan: z
        .string()
        .optional(),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    bio: z.string().max(160).min(4).optional(),

    githubUsername: z.string().optional(),
    linkedInUsername: z.string().optional(),
    xUsername: z.string().optional(),
    personalWebsite: z.string().url().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    bio: "I own a computer.",
}

export function ProfileForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    function onSubmit(data: ProfileFormValues) {
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
                                    pseudonym. You can only change this once every 30 days.
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage verified email addresses in your{" "}
                                <Link href="/examples/forms">email settings</Link>.
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
                                    <Input placeholder="@username" {...field} />
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
                                    <Input placeholder="@username" {...field} />
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
                                    <Input placeholder="@username" {...field} />
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
                                    <Input placeholder="@username" {...field} />
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