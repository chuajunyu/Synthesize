"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import FormTitleAndDescription from "@/components/FormTitleAndDescription";
import FormOverviewStatistics from "@/components/FormOverviewStatistics";
import readFormData from "@/database/read_form";
import { FormProps } from "@/database/read_form";
import { ResponsesTable } from "@/components/ResponsesTable";
import { ResponseFormat, getFormResponses } from "@/database/read_form_responses";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ViewFormPage({ params }: { params: { formId: string } }) {
    const [formData, setFormData] = useState<FormProps | null>(null);
    const [responseData, setResponseData ] = useState<{ [key: string]: ResponseFormat} | null>(null);
    const [responseCount, setResponseCount] = useState<number>(0);
    const [uniqueRespondersCount, setUniqueRespondersCount] = useState<number>(0);
    
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
                if (data) {
                    const len = Object.keys(data).length;
                    setResponseCount(len);
                    // the new Set stores unique creatorIds
                    const responders = new Set<string>();
                    Object.keys(data).forEach(key => {
                        responders.add(data[key].userId);
                    });
                    setUniqueRespondersCount(responders.size);
                }
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
    const text: string[] = [
        "Unique Responders", 
        "Responses"
    ];
    return (
        <ProtectedRoute>
            <div className="flex flex-col mx-8">
                <div className="flex flex-row w-full mt-10 h-full items-stretch">
                    <div className="flex flex-col flex-grow mr-5">
                        <FormTitleAndDescription title={formData.title} description={formData.description}/>
                    </div>
                    <div className="flex flex-grow flex-col mr-5">
                        <FormOverviewStatistics count={uniqueRespondersCount} text={text[0]}/>
                    </div>
                    <div className="flex flex-grow flex-col">
                        <FormOverviewStatistics count={responseCount} text={text[1]}/>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <span className="flex my-3 text-xl font-semibold">View Individual Form Responses</span>
                    <div className="flex flex-col flex-grow">
                        <ResponsesTable responseData={responseData} formId={params.formId} />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
