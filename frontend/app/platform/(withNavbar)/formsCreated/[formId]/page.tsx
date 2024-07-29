"use client"
import React, { useState, useEffect } from "react";
import FormOverviewStatistics from "@/components/FormOverviewStatistics";
import read_form_data from "@/database/read_form";
import ResponsesTable from "@/components/ResponsesTable";
import read_form_responses, { ResponseFormat } from "@/database/read_form_responses";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Block1 from "@/components/Block1"
import { Form } from "@/lib/types";
import read_aiForm from "@/database/read_aiForm";
import read_aiForm_responses from "@/database/read_aiForm_responses";

export default function ViewFormInsightsPage({ params }: { params: { formId: string } }) {
    const [formData, setFormData] = useState<Form | null>(null);
    const [responseData, setResponseData ] = useState<{ [key: string]: ResponseFormat} | null>(null);
    const [responseCount, setResponseCount] = useState<number>(0);
    const [uniqueRespondersCount, setUniqueRespondersCount] = useState<number>(0);
    
    useEffect(() => {
        async function fetchFormData() {
            try {
                const data = await read_form_data(params.formId);
                if (data.isAiForm) {
                    const aiData = await read_aiForm(params.formId);
                  setFormData(aiData);
                } else {
                  setFormData(data);
                }
            } catch (error) {
                console.log("error fetching form data");
            }
        }
        fetchFormData();
    }, [params.formId]);

    useEffect(() => {
        async function fetchResponseData() {
            try {
                if (formData.isAiForm) {
                    const data = await read_aiForm_responses(params.formId);
                    setResponseData(data);
                } else {
                    const data = await read_form_responses(params.formId);
                    setResponseData(data);
                }
            } catch (error) {
                console.log("error found", error);
            }
        }
        if (formData) {
            fetchResponseData();
        }
    }, [params.formId, formData]);

    useEffect(() => {
      if (responseData) {
        const len = Object.keys(responseData).length;
        setResponseCount(len);
        // the new Set stores unique creatorIds
        const responders = new Set<string>();
        Object.keys(responseData).forEach((key) => {
          responders.add(responseData[key].userId);
        });
        setUniqueRespondersCount(responders.size);
      }
    }, [responseData]);

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
          <div className="flex flex-row w-full mt-10 h-full items-stretch space-x-5">
            <div className="flex flex-grow min-h-full">
              <Block1
                title={title}
                text={description}
                showButton={false}
                buttonText=""
                href=""
              />
            </div>
            <div className="flex flex-grow min-h-full">
              <FormOverviewStatistics
                count={uniqueRespondersCount}
                text={text[0]}
              />
            </div>
            <div className="flex flex-grow min-h-full">
              <FormOverviewStatistics count={responseCount} text={text[1]} />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <span className="flex my-3 mt-10 text-xl font-semibold">
              View Individual Form Responses
            </span>
            <div className="flex flex-col flex-grow">
              <ResponsesTable
                responseData={responseData}
                formId={params.formId}
              />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
}
