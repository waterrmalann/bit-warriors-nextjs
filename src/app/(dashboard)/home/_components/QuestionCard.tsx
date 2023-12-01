import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const QuestionCard = () => {
    return (
        <div className="flex gap-4">
        <Card className="w-[350px] bg-neutral-900 ">
          <CardHeader>
            <CardTitle className="text-center">Suggested Challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="language" className="sr-only">Language</Label>
                  <Select value={"js"}>
                    <SelectTrigger id="language" className="bg-neutral-900">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-neutral-900">
                      <SelectItem value="js">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="c#">C#</SelectItem>
                      <SelectItem value="dart">Dart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category" className="sr-only">Category</Label>
                  <Select value={"fundamentals"}>
                    <SelectTrigger id="category" className="bg-neutral-900">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-neutral-900">
                      <SelectItem value="fundamentals">Fundamentals</SelectItem>
                      <SelectItem value="puzzle">Puzzles</SelectItem>
                      <SelectItem value="bugs">Bug Fixing</SelectItem>
                      <SelectItem value="dsa">DSA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex gap-2 items-center justify-center">
            <Button variant="outline" className="bg-neutral-900">Skip</Button>
            <Button>Attempt</Button>
          </CardFooter>
        </Card>
        <Card className="w-full flex flex-col justify-between bg-neutral-800">
        <CardHeader>
            <CardTitle>EAS708 :: Add two numbers together</CardTitle>
            <CardDescription>Write a one liner to add two numbers together and return the sum.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between items-end">
            <Badge>Fundamentals</Badge>
            {/* <Button>Deploy</Button> */}
          </CardFooter>
        </Card>
        </div>
      )
}

export default QuestionCard