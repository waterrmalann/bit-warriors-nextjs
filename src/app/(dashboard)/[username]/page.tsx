"use client";

import { Card } from "@/components/ui/card";
import ProfileCard from "./_components/ProfileCard";
import { UserProfile, useProfile } from "@/hooks/useProfile";
import RankCard from "./_components/RankCard";

export default function Page({ params }: { params: { username: string } }) {
  const { profile } = useProfile(params.username);

  return (
    <>
      <div className="space-y-6 p-10 md:block">
        {profile && <ProfileCard profile={profile} />}
      </div>
      <div className="space-y-6 pb-16 md:block">
        <RankCard
            totalScore={profile?.totalScore || 0}
            totalSubmissions={profile?.totalSubmissions || 0}
        />
      </div>
    </>
  );
}
