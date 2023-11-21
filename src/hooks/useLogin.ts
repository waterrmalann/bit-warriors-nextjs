"use client";

import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';

type LoginCredentials = {
    username: string;
    password: string;
};

interface LoginResult {
    mfa_required: boolean,
    message: string,
    token: string
}

async function loginPost(url: string, { username, password }: LoginCredentials) {
    try {
        const res = await axios.post(url, {
            username, password
        }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // get cookies
        }) as AxiosResponse<LoginResult>;
        return { data: res.data, error: undefined }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { data: undefined, error: error };
        } else {
            throw error;
        }
    }
}

export default function useLogin() {
    return {
        trigger: async (username: string, password: string) => {
            return loginPost(API_ROUTES.AUTH.LOGIN_POST, { username, password })
        },
        isMutating: false
    };
}