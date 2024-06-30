"use client"

import "@/app/globals.css";
import { NavigationBar } from "@/components/NavigationBar";
import { useAuth } from "@/lib/firebase/AuthContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const email = user?.email ?? "";

    return (
        <div className="flex flex-row">
            <div>
                <NavigationBar user={email} />
            </div>
            <div className="flex-auto ml-56 mb-20">{children}</div>
        </div>
    );
}
