"use client";

import { createContext } from "react";

export type User = {
    _id: string;
    username: string;
    email: string;
    isLoggedIn: boolean | null;
};

type setUser = (user: User | null) => void;

type refetch = () => void;

export type UserContextType = {
    user: User | undefined | null;
    setUser: setUser;
    refetch: refetch;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export default UserContext;