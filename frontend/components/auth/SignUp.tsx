"use client";

import Link from "next/link";
import EmailSignUp from "@/components/auth/EmailSignUp";
import { SignInGoogle } from "@/components/authFunctions";

export default function SignUp() {
    return (
        <div className="flex flex-col justify-center bg-white h-screen w-full md:rounded-l-3xl">
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-balance text-muted-foreground">
                    Select one of the following sign-up methods
                    </p>
                </div>
                <EmailSignUp />
                <div className="grid gap-2">
                    <SignInGoogle />
                </div>
                <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                    <Link href="login" className="underline">
                    Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
