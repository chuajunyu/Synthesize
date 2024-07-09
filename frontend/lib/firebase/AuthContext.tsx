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
import { LOCAL, MOCK_USER } from "@/config";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth/authSlice";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
}

const AuthContext: Context<AuthContextProps | undefined> = createContext<
    AuthContextProps | undefined
>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (LOCAL) {
            const mockUser = {
                email: MOCK_USER,
                displayName: "LOCAL DEV MODE (MOCK USER)",
            } as User;
            setUser(null);
            setUserState(null);
            setLoading(false);
        } else {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user);
                setUserState(user);
                setLoading(false);
            });
            return () => unsubscribe();
        }
    }, [dispatch]);

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
