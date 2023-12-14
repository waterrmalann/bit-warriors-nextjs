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

async function problemFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<Problem>;
    return res.data;
}

export function useProblem(problemId: string) {
    const { data: problem, mutate, error } = useSWR<Problem>(API_ROUTES.PROBLEMS.PROBLEM_GET(problemId), problemFetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const loading = problem === undefined && error === undefined;

    return {
        problem,
        loading,
        mutate
    };
};