import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button";
import { AdminAuthForm } from "./components/AdminAuthForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Administrator login page.",
}

export default function AdminLogin() {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center grid">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Userspace
        </Link>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Administrator login
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter a valid administrator email and passphrase below to login.
              </p>
            </div>
            <AdminAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              This page is meant to be accessed only by administrators.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}