"use client";

import { Card } from "@/components/ui/card";
import ProfileCard from "./_components/ProfileCard";
import { UserProfile, useProfile } from "@/hooks/useProfile";
import RankCard from "./_components/RankCard";
import { RecentSubmissions } from "./_components/RecentSubmissions";

export default function Page({ params }: { params: { username: string } }) {
  const { profile, recentSubmissions } = useProfile(params.username);

  return (
    <>
      <div className="dark:bg-neutral-900 min-h-screen h-full space-y-6 p-16 pb-16 md:block">
        {profile && <ProfileCard profile={profile} />}
        <RankCard
          totalScore={profile?.totalScore || 0}
          totalSubmissions={profile?.totalSubmissions || 0}
        />
        <RecentSubmissions submissions={recentSubmissions ?? []} />
      </div>
    </>
  );
}
