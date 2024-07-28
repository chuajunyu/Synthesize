"use client"
import React, { useState, useEffect } from "react";
import FormOverviewStatistics from "@/components/FormOverviewStatistics";
import read_form_data from "@/database/read_form";
import ResponsesTable from "@/components/ResponsesTable";
import read_form_responses, { ResponseFormat } from "@/database/read_form_responses";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Block1 from "@/components/Block1"
import { Form } from "@/lib/types";

export default function ViewFormInsightsPage({ params }: { params: { formId: string } }) {
    const [formData, setFormData] = useState<Form | null>(null);
    const [responseData, setResponseData ] = useState<{ [key: string]: ResponseFormat} | null>(null);
    const [responseCount, setResponseCount] = useState<number>(0);
    const [uniqueRespondersCount, setUniqueRespondersCount] = useState<number>(0);
    
    useEffect(() => {
        async function fetchFormData() {
            try {
                const data = await read_form_data(params.formId);
                setFormData(data);
            } catch (error) {
                console.log("error fetching form data");
            }
        }
        fetchFormData();
    }, [params.formId]);

    useEffect(() => {
        async function fetchResponseData() {
            try {
                const data = await read_form_responses(params.formId);
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
    const { description, title } = formData;
    
    const text: string[] = [
        "Unique Responders", 
        "Responses"
    ];
    return (
        <ProtectedRoute>
            <div className="flex flex-col mx-8">
                <div className="flex flex-row w-full mt-10 h-full items-stretch">
                    <div className="flex flex-grow mr-5">
                        <Block1 title={title} text={description}
                            showButton={false} buttonText="" href=""/>
                    </div>
                    <div className="flex flex-grow flex-col mr-5">
                        <FormOverviewStatistics count={uniqueRespondersCount} text={text[0]}/>
                    </div>
                    <div className="flex flex-grow flex-col">
                        <FormOverviewStatistics count={responseCount} text={text[1]}/>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <span className="flex my-3 mt-10 text-xl font-semibold">View Individual Form Responses</span>
                    <div className="flex flex-col flex-grow">
                        <ResponsesTable responseData={responseData} formId={params.formId} />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
