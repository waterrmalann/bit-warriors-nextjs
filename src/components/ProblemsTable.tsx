import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";

type Problem = {
    id: string;
    problemId: string;
    slug: string;
    title: string;
    description: string;
    difficulty: string;
    constraints: string[];
    examples: string[];
    tags: string[];
    hint: string;
    upvotes: number;
    downvotes: number;
}

interface ProblemTableProps extends React.HTMLAttributes<HTMLDivElement> {
    problems: Problem[];
}


export function ProblemsTable({problems}: ProblemTableProps) {
    return (
        <Table>
            <TableCaption>Some problems for you to try out.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Problem</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right">Acceptance</TableHead>
                    <TableHead className="text-right">Difficulty</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {problems.map((problem) => (
                    
                        <TableRow key={problem.problemId}>
                            <TableCell className="font-medium"><Link href={`/problems/${problem.problemId}`}>{problem.problemId}</Link></TableCell>
                            <TableCell className="font-medium"><Link href={`/problems/${problem.problemId}`}>{problem.title}</Link></TableCell>
                            <TableCell className="text-right">0.0%</TableCell>
                            <TableCell className="text-right">{problem.difficulty}</TableCell>
                        </TableRow>
                    
                ))}
            </TableBody>
        </Table>
    )
}