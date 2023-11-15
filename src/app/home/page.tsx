"use client";

import { redirect } from 'next/navigation';
import useUser from '../hooks/useUser';

export default function HomePage() {
    const { user } = useUser();
    const isLoggedIn = user?.isLoggedIn;
    
    if (isLoggedIn === null) {
        return (
            <div className="text-center h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        )
    }

    if (!isLoggedIn) {
        redirect('/login');
    }

    return (
        <div>Hello World</div>
    )
}