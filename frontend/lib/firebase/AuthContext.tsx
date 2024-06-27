"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    Context,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./app";
import { LOCAL, DEVELOPMENT, PRODUCTION } from "@/config";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
}

const AuthContext: Context<AuthContextProps | undefined> = createContext<
    AuthContextProps | undefined
>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    console.log("LOCAL is ", LOCAL);
    console.log(process.env.NEXT_PUBLIC_NODE_ENV);

    useEffect(() => {
        console.log(LOCAL, DEVELOPMENT, PRODUCTION);
        if (LOCAL) {
            setUser({
                email: "chuajunyu1@gmail.com",
                displayName: "LOCAL DEV MODE (Jun Yu's acct)",
            } as User);
            setLoading(false);
        } else {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user);
                setLoading(false);
            });
            return () => unsubscribe();
        }
    }, []);

    const value = { user, loading };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
