import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserProfile } from "@/hooks/useProfile"
import ProfilePicture from "./ProfilePicture"


interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: UserProfile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <Card className="bg-neutral-800 w-[1024px] mx-auto p-5">
      <div className="flex">
        <ProfilePicture />
        <CardHeader>
          <CardTitle>Unknown {profile.clan && <span className="text-base text-zinc-400">{'[' + profile.clan + ']'}</span>}</CardTitle>
          <p className="text-lg text-primary font-mono" >@{profile.username}</p>
          <CardDescription>{profile.bio || "i am a very mysterious person."}</CardDescription>
        </CardHeader>
      </div>
      {/* <CardContent>

      </CardContent>
      <CardFooter className="flex gap-2 items-center justify-center">
        <Button>Follow</Button>
      </CardFooter> */}
    </Card>
  )
}

export default ProfileCard