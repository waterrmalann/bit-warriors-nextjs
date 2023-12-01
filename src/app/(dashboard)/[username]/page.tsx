"use client";

import { Card } from "@/components/ui/card";
import ProfileCard from "./_components/ProfileCard";
import { UserProfile, useProfile } from "@/hooks/useProfile";

export default function Page({ params }: { params: { username: string } }) {
    const { profile } = useProfile(params.username);

    return (
        <>
            <div className="space-y-6 p-10 pb-16 md:block">
                {profile && <ProfileCard profile={profile} />}
            </div>
        </>
    );
  }