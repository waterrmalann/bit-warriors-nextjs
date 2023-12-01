"use client";

import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

type Problem = {
    id: string;
    problemId: string;
    slug: string;
    title: string;
    description: string;
    difficulty: string;
    constraints: string[];
    examples: string[];
    tags: string[];
    hint: string;
    upvotes: number;
    downvotes: number;
}

async function problemsFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<Problem[]>;
    return res.data;
}

export function useProblems() {
    const { data: problems, mutate, error } = useSWR<Problem[]>(API_ROUTES.PROBLEMS.GET, problemsFetcher);

    const loading = problems === undefined && error === undefined;

    return {
        problems,
        loading,
        mutate
    };
};