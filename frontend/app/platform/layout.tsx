import "@/app/globals.css";
import { redirect } from "next/navigation";
import { NavigationBar } from "@/components/NavigationBar";
import getCurrentUser from "@/lib/firebase/auth_state_listener";

export const metadata = {
    title: "Synthesize",
    description: "Create forms, surveys and quizzes seamlessly with AI",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const user = getCurrentUser();
    const displayName = user ? user.displayName : "";

    return !user ? (
        redirect("/auth/login")
    ) : (
        <div className="flex flex-row">
            <div>
                <NavigationBar user={displayName || ""} />
            </div>
            <div className="flex-auto">{children}</div>
        </div>
    );
}
