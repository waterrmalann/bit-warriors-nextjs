"use client";

import { TopBar } from '@/components/TopBar';

function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <TopBar />
            {children}
        </>
    )
}

export default Layout;
