import { Card, CardTitle } from "@/components/ui/card";
import { Submission } from "@/hooks/useProfile";

interface RecentSubmissionsProp {
  submissions: Submission[];
}

export const RecentSubmissions = ({ submissions }: RecentSubmissionsProp) => {
  return (
    <Card className="bg-neutral-800 w-[1024px] mx-auto p-5">
      <CardTitle className="my-3 tracking-wide">Recent Submissions</CardTitle>
      {submissions.map((submission) => (
        <div key={submission.id} className="bg-neutral-700 rounded-md p-5 my-3">
          <p><strong>{submission.problemId}</strong> - <span className="text-right">{new Date(submission.submittedAt).toString()}</span></p>
        </div>
      ))}
    </Card>
  );
};
