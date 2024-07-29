"use client"
import React, { useEffect, useState } from "react";
import readResponseData, { ResponseDataProps } from "@/database/read_response";
import ViewResponsePage from "@/components/ViewResponsePage";
import ViewAiResponsePage from "@/components/ViewAiResponsePage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import read_form_data from "@/database/read_form";
import { Form } from "@/lib/types";
import read_aiForm from "@/database/read_aiForm";
import readAIResponseData, {
  AiResponseData,
} from "@/database/read_ai_response";

export default function Page({ params }: {
  params: { formId: string; responseId: string };
}) {
  const [formData, setFormData] = useState<Form | null>(null);
  const [responseData, setResponseData] = useState<ResponseDataProps | null>(null);
  const [aiResponseData, setAiResponseData] = useState<AiResponseData | null>(
    null
  );

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
        const data = await read_form_data(params.formId);
        if (data.isAiForm) {
          const aiData = await readAIResponseData(
            params.formId,
            params.responseId
          );
          setAiResponseData(aiData);
        } else {
          const responseData = await readResponseData(
            params.formId,
            params.responseId
          );
          setResponseData(responseData);
        }
      } catch (error) {
        console.log("error fetching form data");
      }
    }
    if (formData) {
      fetchResponseData();
    }
  }, [params.formId, formData]);

  if (formData === null && responseData === null) {
    return (
      <ProtectedRoute>
        <div>
          <h1>Form or manual response not found</h1>
        </div>
      </ProtectedRoute>
    );
  } 
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen">
          <div className="justify-center w-full mx-8 mt-10">
            {responseData && (
              <ViewResponsePage
                formData={formData}
                responseData={responseData}
              />
            )}
            {aiResponseData && (
              <ViewAiResponsePage
                formData={formData}
                responseData={aiResponseData}
              />
            )}
          </div>
        </div>
      </ProtectedRoute>
    );
}
