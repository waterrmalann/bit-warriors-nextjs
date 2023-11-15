import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/admin/problems"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Problems
      </Link>
      <Link
        href="/admin/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Learning Tracks
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}