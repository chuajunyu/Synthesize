"use client"
import React, { useEffect, useState } from 'react';
import { CreatedFormsTable } from "@/components/CreatedFormsTable";
import read_all_form_data from "@/database/read_all_forms";

export default function FormsCreated() {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await read_all_form_data();
            setFormData(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!formData) {
        return <div>No forms found</div>;
    }

    return (
        <div className="flex min-h-screen">
            <div className="justify-center ml-20 mt-5">
                <span className="flex mt-3 mb-3 text-xl font-semibold">View your created forms, Shelia</span>
                <CreatedFormsTable formData={formData} />
            </div>
        </div>
    );
}