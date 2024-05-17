import Link from "next/link"
import {auth, SignInGoogle, SignInGithub} from "@/components/authFunctions";
import {redirect} from "next/navigation"


export default async function Dashboard() {
  let session = await auth();
  let user = session?.user?.email;

  return (
    user ? <p> {redirect("/form")} </p> :
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Sign up using your social accounts
        </p>
      </div>
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
