"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from "@/lib/firebase/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const aiForm = () => {
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const { user } = useAuth();

    console.log(user)
    
    useEffect(() => {
        async function authenticate() {
            const email = user?.email ?? "";
            setUserEmail(email);
            setLoading(false);
        }
        authenticate();
    }, [user?.email]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const name = user?.displayName;

    return (
        <ProtectedRoute>
            <div className="flex mx-20 mt-5">
                <div className="flex flex-col w-full ">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        Using AI has never been better, {name}
                    </span>
                </div>
            </div>
        </ProtectedRoute>
    );
}
export default aiForm