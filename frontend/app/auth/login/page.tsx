import Link from "next/link";
import { redirect } from "next/navigation";
import { EmailLogIn } from "@/components/auth/emailPasswordAuth";
import { SignInGoogle, SignInGithub } from "@/components/authFunctions";
import auth from "@/lib/firebase/app";

export default function Dashboard() {
    const user = auth.currentUser;
    console.log("user is: ", user);

    return user ? (
        <p> {redirect("/platform/form")} </p>
    ) : (
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                    Select one of the following log-in methods
                </p>
            </div>
            <EmailLogIn />
            <div className="grid gap-2">
                <SignInGoogle />
            </div>
            <div className="grid gap-2">
                <SignInGithub />
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="signup" className="underline">
                    Sign up
                </Link>
            </div>
        </div>
    );
}
