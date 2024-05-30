"use client"

import Link from "next/link"
import { EmailSignUp } from "@/components/auth/emailPasswordAuth"
import {SignInGoogle, SignInGithub} from "@/components/authFunctions";
import {redirect} from "next/navigation"
import auth from "@/lib/firebase/auth";
import getCurrentUser from "@/lib/firebase/auth_state_listener";


export default function Dashboard() {
  const user = auth.currentUser;
  console.log(user)

  return (
    user ? <p> {redirect("/platform/form")} </p> :
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
      <div className="grid gap-2">
        <SignInGithub />
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="login" className="underline">
          Log in
        </Link>
      </div>
    </div>
  )
}
