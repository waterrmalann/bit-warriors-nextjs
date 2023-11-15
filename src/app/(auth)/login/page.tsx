export default function LoginPage() {
    return (
        <>
            <a href="/register" className="absolute right-4 top-4 md:right-8 md:top-8">Signup</a>
            <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Login to your account.
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password below to login.
                    </p>
                </div>
                <div>
                    <form>
                        <input name="username" type="text" />
                        <input name="password" type="password" />
                    </form>
                </div>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <a
                        href="/terms"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
        </>
    )
}