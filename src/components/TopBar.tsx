import Logo from "@/app/_components/Logo";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/hooks/useUser";

import { cn, getInitials } from "@/lib/utils"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export function UserNav() {

    const { user, loading, isLoggedIn, logout } = useUser();
    const router = useRouter();

    async function handleLogout() {
        try {
            await logout();
        } finally {
            router.replace('/login');
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/login");
        }
    }, [])

    if (loading) {
        return (
            <div className="text-center h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        )
    }

    if (!isLoggedIn) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt={user?.username} />
                        <AvatarFallback>{getInitials(user?.username || 'X')}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">@{user?.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email || "Loading..."}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={`/${user?.username ?? 'profile'}`}><DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem></Link>
                    <DropdownMenuItem>
                        Submissions
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <Link href="/profile"><DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem></Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    {loading ? 'Logging out' : 'Log out'}
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <Link href="/home" className="text-sm font-medium transition-colors hover:text-primary hover:underline">Overview</Link>
            <Link href="/top" className="text-sm font-medium transition-colors hover:text-primary hover:underline">Top</Link>
            <Link href="/problems" className="text-sm font-medium transition-colors hover:text-primary hover:underline">Problems</Link>
            <Link href="/submissions" className="text-sm font-medium transition-colors hover:text-primary hover:underline">Submissions</Link>
        </nav>
    )
}

export function TopBar() {

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <div className="flex items-center text-lg font-mono">
                            <Logo />
                        </div>
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <UserNav />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}