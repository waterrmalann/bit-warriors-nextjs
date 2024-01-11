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
import { Submission } from "@/hooks/useProfile";

interface SubmissionsTableProps extends React.HTMLAttributes<HTMLDivElement> {
    submissions: Submission[];
}

export function SubmissionsTable({submissions}: SubmissionsTableProps) {
    return (
        <Table>
            <TableCaption>Your recent submissions.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Serial</TableHead>
                    <TableHead>Problem</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Submitted At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {submissions.map((submission, index) => (
                    <TableRow key={submission.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{submission.problemId}</TableCell>
                        <TableCell className="text-right">PASS</TableCell>
                        <TableCell className="text-right">{new Date(submission.submittedAt).toString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}