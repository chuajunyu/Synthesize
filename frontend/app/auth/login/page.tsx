import RedirectIfLoggedIn from "@/components/auth/RedirectIfLoggedIn";
import Login from "@/components/auth/Login"

export default function LoginPage() {
    return (
        <RedirectIfLoggedIn>
            <Login />
        </RedirectIfLoggedIn>
    );
}
