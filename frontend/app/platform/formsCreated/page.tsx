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
    const { user } = useAuth();

    console.log(user)
    
    useEffect(() => {
        async function authenticate() {
            const email = user?.email ?? "";
            setUserEmail(email);
        }
        authenticate();
    }, [user?.email]);

    useEffect(() => {
        async function fetchData() {
            if (userEmail !== null) {
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

    const name = user?.displayName;

    return (
        <ProtectedRoute>
            <div className="flex mx-8 mt-5">
                <div className="flex flex-col w-full ">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        View your created forms, {name}
                    </span>
                    <CreatedFormsTable formData={formData} />
                </div>
            </div>
        </ProtectedRoute>
    );
}
