"use client"
import React, { useEffect, useState } from 'react';
import { CreatedFormsTable } from "@/components/CreatedFormsTable";
import { getUserForms } from '@/database/read_user_forms';
import { auth } from "@/components/authFunctions";

export interface MyFormData {
    formId: string;
    createdDate: string;
    title: string;
}

export default function FormsCreated() {
    const [formData, setFormData] = useState<{ [key: string]: MyFormData; } | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<string | null>(null);
    
    useEffect(() => {
        async function authenticate() {
            const session = await auth();
            const userEmail = session?.user?.email ?? "";
            setUser(userEmail);
        }
        authenticate();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (user !== null) {
                const data = await getUserForms(user);
                console.log(data)
                setFormData(data);
                setLoading(false);
            }
        }
        fetchData();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!formData) {
        return <div>No forms found</div>;
    }

    return (
        <div className="flex mx-20 mt-5">
            <div className="flex flex-col w-full ">
                <span className="flex mt-3 mb-3 text-xl font-semibold">View your created forms, Shelia</span>
                <CreatedFormsTable formData={formData} />
            </div>
        </div>
    );
}