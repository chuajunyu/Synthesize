"use client"
import React, { useEffect, useState } from 'react';
import { CreatedFormsTable } from "@/components/CreatedFormsTable";
import { getUserForms } from '@/database/read_user_forms';
import { useAuth } from "@/lib/firebase/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export interface MyFormData {
    formId: string;
    createdDate: string;
    title: string;
}

export default function FormsCreated() {
    const [formData, setFormData] = useState<{ [key: string]: MyFormData; } | null>(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const { user, loading } = useAuth();
    
    useEffect(() => {
        async function authenticate() {
            const email = user?.email ?? "";
            setUserEmail(email);
        }
        authenticate();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (userEmail !== null) {
                const data = await getUserForms(user);
                setFormData(data);
                setLoading(false);
            }
        }
        fetchData();
    }, [userEmail]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!formData) {
        return <div>No forms found</div>;
    }


    return (
        <ProtectedRoute>
            <div className="flex min-h-screen">
                <div className="justify-center ml-20 mt-5">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        View your completed forms, Shelia
                    </span>
                    <CreatedFormsTable />
                </div>
            </div>
        </ProtectedRoute>
    );
}
