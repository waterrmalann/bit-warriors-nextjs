import { Badge } from "@/components/ui/badge";

const ProfilePicture = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
        <div className="w-[128px] h-[128px] rounded-2xl bg-zinc-500">
            <p>A</p>
        </div>
        <Badge>Focusing...</Badge>
    </div>
  )
}

export default ProfilePicture;