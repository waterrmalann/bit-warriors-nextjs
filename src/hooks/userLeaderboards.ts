"use client";

import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

export type RankedUser = {
    username: string;
    totalScore: number;
    totalSubmissions: number;
    rank: number;
}

async function leaderboardsFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<RankedUser[]>;
    return res.data;
}

export function useLeaderboards() {
    const { data: leaderboards, mutate, error } = useSWR<RankedUser[]>(API_ROUTES.LEADERBOARDS.GET, leaderboardsFetcher);

    const loading = leaderboards === undefined && error === undefined;

    return {
        leaderboards,
        loading,
        mutate
    };
};