"use client";

import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isLoggedIn, loading } = useUser(); 
    const router = useRouter();


    useEffect(() => {
      if (loading) return;

      if (!isLoggedIn) {
        console.log("isLoggedIn: false, initial redirect to /login")
        return router.replace("/login");
      }
    }, [loading, isLoggedIn]);


    if (loading) {
      return <p>loading</p>;
    }

    if (!isLoggedIn) {
      return null;
    }

    return <Component {...props} />;
  };
}