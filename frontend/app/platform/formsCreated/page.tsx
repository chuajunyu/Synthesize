"use client"
import React from 'react';
import CreatedFormsTable from "@/components/CreatedFormsTable";
import { useAuth } from "@/lib/firebase/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function FormsCreated() {
    const { user } = useAuth();
    const name = user?.displayName;

    return (
        <ProtectedRoute>
            <div className="flex mx-8 mt-5">
                <div className="flex flex-col w-full ">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        View your created forms, {name}
                    </span>
                    <CreatedFormsTable />
                </div>
            </div>
        </ProtectedRoute>
    );
}
