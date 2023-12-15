"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"
import Logo from "@/components/Logo"


export function MainNav() {
    return (
        <div className="flex gap-6 md:gap-10">
                <span className="items-center x-2 md:flex hidden font-mono sm:inline-block"><Logo /></span>
            <nav className="hidden gap-6 md:flex">
            <Link
              href="#"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground"
            >
              Features
            </Link>
            <Link
              href="https://github.com/waterrmalann/bit-warriors-nextjs"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground"
            >
              Github
            </Link>
            <Link
              href="#"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground"
            >
              Documentation
            </Link>
            </nav>
            <button className="flex items-center space-x-2 md:hidden">Login</button>
        </div>
    )
}