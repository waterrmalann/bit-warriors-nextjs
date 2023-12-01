"use client";

import { TopBar } from '@/components/TopBar';
import Logo from '../_components/Logo';

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
