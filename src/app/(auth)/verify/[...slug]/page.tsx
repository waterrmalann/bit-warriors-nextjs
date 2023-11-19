"use client";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const { toast } = useToast();
    const pathname = usePathname();
    const verifyEmail = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/verify/${pathname.split('/').at(-1)}`);
          if (response.status === 200) {
            toast({
                title: "Email has been successfully verified."
            });
            redirect('/login');
          }
        } catch (e: any) {
          console.error(e);
            toast({
                variant: "destructive",
                title: "An error occured.",
                description: "Could not verify email address."
            });
            redirect('/login');
        }
      };
    
      useEffect(() => {
        verifyEmail();
      }, []);

    return (<p>Verifying...</p>);
}