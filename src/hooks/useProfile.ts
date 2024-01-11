"use client";

import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

export type UserProfile = {
    username:string;
    clan: string;
    bio: string;
    followers: number;
    following: number;
    totalScore: number;
    totalSubmissions: number;
    // ranking, lastSeen
};

export type Submission = {
    feedback: string;
    id: string;
    problemId: string;
    submittedBy: string;
    submittedAt: string;
    language: string;
    code: string;
    runtime: string;
    memory: string;
}

async function profileFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<UserProfile>;
    return res.data;
}

async function submissionFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<Submission[]>;
    return res.data;
}

export function useProfile(username: string) {
    const { data: profile, mutate, error, isLoading } = useSWR<UserProfile>(API_ROUTES.PROFILE.GET(username), profileFetcher);
    const { data: recentSubmissions, mutate: mutateSubmissions, error: errorSubmissions, isLoading: isLoadingSubmissions} = useSWR<Submission[]>(API_ROUTES.SUBMISSION.USER_GET(username), submissionFetcher)

    const loading = profile === undefined && error === undefined;
    // todo: const (un)follow = () => {};

    return {
        profile,
        recentSubmissions,
        loading,
        mutate,
        mutateSubmissions
    };
};