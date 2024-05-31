"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import FormTitleAndDescription from "@/components/FormTitleAndDescription";
import FormOverviewStatistics from "@/components/FormOverviewStatistics";
import readFormData from "@/database/read_form";
import { FormProps } from "@/database/read_form";
import { ResponsesTable } from "@/components/ResponsesTable";
import { ResponseFormat, getFormResponses } from "@/database/read_form_responses";

export default function ViewFormPage({ params }: { params: { formId: string } }) {
    const [formData, setFormData] = useState<FormProps | null>(null);
    const [responseData, setResponseData ] = useState<{ [key: string]: ResponseFormat} | null>(null);
    
    useEffect(() => {
        async function fetchFormData() {
            try {
                const data = await readFormData(params.formId);
                setFormData(data);
            } catch (error) {
                console.log("error found");
            }
        }
        fetchFormData();
    }, [params.formId]);

    useEffect(() => {
        async function fetchResponseData() {
            try {
                const data = await getFormResponses(params.formId);
                setResponseData(data);
            } catch (error) {
                console.log("error found");
            }
        }
        fetchResponseData();
    }, [params.formId]);
    
    if (!formData) {
        return <div>No Form Data found</div>;
    }
    
    if (!responseData) {
        return <div>No Response Data found</div>;
    }
    const { createdDate, creatorId, description, questions, title } = formData;
    return (
        <div className="flex flex-col min-h-screen mx-20">
            <div className="flex flex-row justify-between w-full mt-10 h-full">
                <div className="flex flex-col w-1/2 mr-5">
                    <FormTitleAndDescription title={formData.title} description={formData.description}/>
                </div>
                <div className="flex-4 flex w-1/4 flex-col mr-5">
                    <FormOverviewStatistics />
                </div>
                <div className="flex-4 flex w-1/4 flex-col mr-5">
                    <FormOverviewStatistics />
                </div>
            </div>
            <span className="flex mt-3 mb-3 text-xl font-semibold">View Individual Form Responses</span>
            <ResponsesTable responseData={responseData} />
        </div>
    );
}
