import { NavigationBar } from "@/components/NavigationBar";
import React from 'react';
import { CreatedFormsTable } from "@/components/CreatedFormsTable";

export default function formsCreated() {
    return (
        <div className="flex min-h-screen">
            <div className="justify-center ml-20 mt-5">
                <span className="flex mt-3 mb-3 text-xl font-semibold">View your completed forms, Shelia</span>
                <CreatedFormsTable />
            </div>
        </div>
    );
}