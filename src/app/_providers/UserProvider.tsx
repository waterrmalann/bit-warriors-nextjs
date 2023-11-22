"use client";

import { useEffect, useState } from "react";
import UserContext, { User } from "../_contexts/UserContext";
import axios, { AxiosResponse } from "axios";

interface ResponseData {
    _id: string;
    username: string;
    email: string;
}

function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>({
        _id: "",
        username: "",
        email: "",
        isLoggedIn: null
    });

    async function getUserData() {
        try {
            const response = await axios.get(`http://localhost:3002/auth`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }) as AxiosResponse<ResponseData>;

            setUser({
                ...response.data,
                isLoggedIn: true
            });
        } catch (error) {
            setUser({ isLoggedIn: false } as User);
            console.error(error);
        }
    }
    const refetch = () => getUserData();

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                refetch
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;