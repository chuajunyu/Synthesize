"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/AuthContext";
import { ProjectProvider } from "@/contexts/ProjectContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState<string| null>(null);

  useEffect(() => {
    async function authenticate() {
        const email = user?.email ?? null;
        if (email != null) {
            setUserEmail(email);
        }
      console.log("Authenticated user email:", email); // Log user email for debugging
    }
    authenticate();
  }, [user]);
    
    return (
            <ProjectProvider userId={userEmail}>{children}</ProjectProvider>
    );
};