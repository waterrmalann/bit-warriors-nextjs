"use client";

import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

type User = {
    username: string;
    totalScore: number;
    totalSubmissions: number;
    rank: number;
}

async function leaderboardsFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<User[]>;
    return res.data;
}

export function useLeaderboards() {
    const { data: leaderboards, mutate, error } = useSWR<User[]>(API_ROUTES.LEADERBOARDS.GET, leaderboardsFetcher);

    const loading = leaderboards === undefined && error === undefined;

    return {
        leaderboards,
        loading,
        mutate
    };
};