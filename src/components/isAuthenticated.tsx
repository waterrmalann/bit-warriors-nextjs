"use client";

import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isLoggedIn } = useUser(); 


    useEffect(() => {
      if (!isLoggedIn) {
        return redirect("/login");
      }
    }, [isLoggedIn]);


    if (!isLoggedIn) {
      return null;
    }

    return <Component {...props} />;
  };
}