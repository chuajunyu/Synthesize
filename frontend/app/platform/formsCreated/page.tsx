"use client"
import React, { useEffect, useState } from 'react';
import { CreatedFormsTable } from "@/components/CreatedFormsTable";
import { getUserForms } from '@/database/read_user_forms';
import { useAuth } from "@/lib/firebase/AuthContext";
import { ShareButton } from "@/components/ShareButton";
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
            if (user !== null) {
                const data = await getUserForms(userEmail);
                console.log(data)
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
            <div className="flex mx-20 mt-5">
                <div className="flex flex-col w-full ">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        View your created forms, Shelia
                    </span>
                    <CreatedFormsTable formData={formData} />
                </div>
            </div>
        </ProtectedRoute>
    );
}
