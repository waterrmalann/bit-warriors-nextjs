"use client";

import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';

type RegisterCredentials = {
    username: string;
    email: string;
    password: string;
};

interface RegisterResult {
    success: boolean;
}

async function registerPost(url: string, { username, email, password }: RegisterCredentials) {
    try {
        const res = await axios.post(url, {
            username, email, password
        }, {
            headers: { "Content-Type": "application/json" }
        }) as AxiosResponse<RegisterResult>;
        return { data: res.data, error: undefined }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { data: undefined, error: error };
        } else {
            throw error;
        }
    }
}

export default function useRegister() {
    return {
        trigger: async (username: string, email: string, password: string) => {
            return registerPost(API_ROUTES.AUTH.REGISTER_POST, { username, email, password })
        },
        isMutating: false
    };
}