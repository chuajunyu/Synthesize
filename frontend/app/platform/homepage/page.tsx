"use client"

import React from 'react';
import Block1 from "@/components/Block1";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {useAuth} from "@/lib/firebase/AuthContext";

export default function DashboardPage() {
    const {user} = useAuth();
    const name = user?.displayName;
    
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen">
                <div className="flex-grow flex-col justify-center ml-20 mt-5">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        Welcome to Synthesize, {name}
                    </span>
                    <div className="flex flex-row gap-x-4 mr-8 mb-8">
                        <Block1 />
                        <Block1 />
                    </div>
                    <Block1 />
                </div>
            </div>
        </ProtectedRoute>
    );
}
