import { cn } from "@/lib/utils"
import { Code } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Code />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://github.com/waterrmalann"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              @waterrmalann
            </a>
            . Open source on{" "}
            <a
              href="https://github.com/waterrmalann/bit-warriors-nextjs"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  )
}