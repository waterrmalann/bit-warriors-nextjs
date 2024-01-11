import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { RankedUser } from '@/hooks/userLeaderboards'
import Link from 'next/link';

interface RankBoardProps {
    users: RankedUser[];   
}

const Rankboard = ({users}: RankBoardProps) => {
  return (
          <Table>
            <TableCaption>The global leaderboards.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Ranking</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="text-right">Total Score</TableHead>
                <TableHead className="text-right">Total Submissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.username}>
                  <TableCell className="font-medium">#{user.rank}</TableCell>
                  <TableCell className="font-bold"><Link href={`/${user.username}`}>{user.username}</Link></TableCell>
                  <TableCell className="text-right">{user.totalScore}</TableCell>
                  <TableCell className="text-right">{user.totalSubmissions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      
  )
}

export default Rankboard