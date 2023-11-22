"use client";

import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';

interface VerifyResult {
    success: boolean,
    message: string
}

async function verifyGet(url: string) {
    try {
        const res = await axios.get(url) as AxiosResponse<VerifyResult>;
        return { data: res.data, error: undefined }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { data: undefined, error: error };
        } else {
            throw error;
        }
    }
}

export default function useVerifyEmail(pathName: string) {
    const token = pathName.split('/').at(-1);
    console.log("Token:", token);
    return {
        trigger: async () => {
            return verifyGet(API_ROUTES.VERIFICATION.EMAIL_GET(token || ''))
        },
        isMutating: false
    };
}