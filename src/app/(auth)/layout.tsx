"use client";

import isAuth from "@/components/isAuthenticated";
import JoinDiscordButton from "../_components/JoinDiscordButton"
import Logo from '../_components/Logo';

function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="flex h-screen">
                <div className=" container relative hidden flex-col items-center justify-center md:grid lg:max-w-none lg:px-0"
                style={{
                    backgroundImage: "radial-gradient(#999 2%, transparent 0)",
                    backgroundSize: "35px 35px"
                }}
                >
                    <h2 className="absolute font-mono left-4 top-4 md:left-8 md:top-8"><Logo /></h2>
                    <JoinDiscordButton />
                </div>
                <div className="dark:bg-neutral-900 bg-neutral-100 relative lg:p-8 w-100 sm:min-w-[650px]">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout;
