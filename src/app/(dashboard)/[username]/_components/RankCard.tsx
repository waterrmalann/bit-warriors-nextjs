import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator';
import React from 'react'

interface RankCardProps extends React.HTMLAttributes<HTMLDivElement> {
    totalScore: number;
    totalSubmissions: number;
}

const RankCard = ({totalScore, totalSubmissions}: RankCardProps) => {
  return (
    <Card className="bg-neutral-900 w-[1024px] mx-auto p-5">
        <div className="flex space-around gap-5">
          <div>
            <h1 className="font-bold text-3xl my-2 text-primary font-mono">{totalScore}</h1>
            <p className="font-semibold">total score.</p>
          </div>
          <Separator orientation="vertical" />
          <div>
            <h1 className="font-bold text-3xl my-2 text-primary font-mono">{totalSubmissions}</h1>
            <p className="font-semibold">total submissions.</p>
          </div>
        </div>
    </Card>
  )
}

export default RankCard