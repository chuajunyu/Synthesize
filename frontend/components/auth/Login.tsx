"use client";

import Link from "next/link";
import { EmailLogIn } from "@/components/auth/emailPasswordAuth";
import { SignInGoogle } from "@/components/authFunctions";

export default function Login() {
    return (
        <div className="flex flex-col justify-center bg-white h-screen w-full md:rounded-l-3xl">
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
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
