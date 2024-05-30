import { NavigationBar } from "@/components/NavigationBar";
import React from 'react';
import { CreatedFormsTable } from "@/components/CreatedFormsTable";
import { ShareButton } from "@/components/ShareButton";

export default function formsCreated() {
    return (
        <div className="flex min-h-screen">
            <div className="justify-center ml-20 mt-5">
                <span className="flex mt-3 mb-3 text-xl font-semibold">View your created forms, Shelia</span>
                <CreatedFormsTable />
            </div>
        </div>
    );
}