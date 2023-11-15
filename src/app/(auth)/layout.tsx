import JoinDiscordButton from "@/components/JoinDiscordButton"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="flex h-screen">
                <div className="bg-zinc-900 container relative hidden flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
                    <h2 className="absolute left-4 top-4 md:left-8 md:top-8">BitWarriors</h2>
                    <h1 className="text-center">Crafted with love by Alan</h1>
                    <JoinDiscordButton />
                </div>
                <div className="bg-zinc-800 relative lg:p-8 w-100 sm:min-w-[650px]">
                    {children}
                </div>
            </div>
        </>
    )
}
