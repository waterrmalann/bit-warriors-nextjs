"use client";

import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

type User = {
    _id: string;
    username: string;
    email: string;
};

async function userFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<User>;
    return res.data;
}

export function useUser() {
    const { data: user, mutate, error, isLoading } = useSWR<User>(API_ROUTES.AUTH.GET, userFetcher);

    const loading = user === undefined && error === undefined;
    const isLoggedIn = !!user && !isLoading; // error && error.status === 403;
    console.log("isLoggedIn", isLoggedIn);

    const logout = async () => {
        const request = await fetch(API_ROUTES.AUTH.LOGOUT_GET, { credentials: 'include' });
        if (!request.ok) {
            throw new Error("Could not log out.");
        }
        mutate(user => undefined, false);
    };

    return {
        user,
        loading,
        mutate,
        logout,
        isLoggedIn,
    };
};