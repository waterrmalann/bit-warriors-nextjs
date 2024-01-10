"use client";

import { useLeaderboards } from "@/hooks/userLeaderboards";

const TopPage = () => {
  const { leaderboards } = useLeaderboards();

  return (
    <div>
      <h1 className="font-bold text-xl">Global Leaderboards</h1>
      {leaderboards?.map(e => (
        <p key={e.username}>#{e.rank} - {e.username} - {e.totalScore} - {e.totalSubmissions}</p>
      ))}
    </div>
  )
}

export default TopPage;