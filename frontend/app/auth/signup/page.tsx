import RedirectIfLoggedIn from "@/components/auth/RedirectIfLoggedIn";
import SignUp from "@/components/auth/SignUp";

export default function SignUpPage() {
    return (
        <RedirectIfLoggedIn>
            <SignUp />
        </RedirectIfLoggedIn>
    );
}
