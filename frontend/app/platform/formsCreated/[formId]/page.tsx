import React from 'react';
import FormTitleAndDescription from "@/components/FormTitleAndDescription";
import FormOverviewStatistics from "@/components/FormOverviewStatistics";

export default function ViewFormPage() {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-row justify-between w-full mx-20 mt-10 h-full">
                <div className="flex-2 flex flex-col mr-5 h-full">
                    <FormTitleAndDescription />
                </div>
                <div className="flex-1 flex flex-col mr-5 h-full">
                    <FormOverviewStatistics />
                </div>
                <div className="flex-1 flex flex-col mr-5 h-full">
                    <FormOverviewStatistics />
                </div>
            </div>
        </div>
    );
}