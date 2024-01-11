"use client";

import { useLeaderboards } from "@/hooks/userLeaderboards";
import Rankboard from "./_components/Rankboard";

const TopPage = () => {
  const { leaderboards } = useLeaderboards();

  return (
    <div className="dark:bg-neutral-900 min-h-screen h-full space-y-6 p-16 pb-16 md:block">
      <h1 className="font-bold text-4xl text-center">Global Leaderboards</h1>
      <Rankboard users={leaderboards || []} />
    </div>
  )
}

export default TopPage;