"use client";

import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

export type UserProfile = {
    username:string;
    clan: string;
    bio: string;
    followers: number,
    following: number,
    // ranking, lastSeen
};

async function profileFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<UserProfile>;
    return res.data;
}

export function useProfile(username: string) {
    const { data: profile, mutate, error, isLoading } = useSWR<UserProfile>(API_ROUTES.PROFILE.GET(username), profileFetcher);

    const loading = profile === undefined && error === undefined;
    // todo: const (un)follow = () => {};

    return {
        profile,
        loading,
        mutate
    };
};