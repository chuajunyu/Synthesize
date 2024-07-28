"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Form {
  title: string;
  description: string;
  createdDate: number;
  creatorId: string;
  isAiForm: boolean;
  informationGoals?: string;
  numberOfQuestions?: string;
}

interface AiResponseDataProps {
  message: string;
  role: string;
  time: number;
}

interface AiResponseData {
  createdDate: number;
  creatorId: string;
  chatHistory: AiResponseDataProps[];
}

interface props {
  formData: Form;
  responseData: AiResponseData;
}

export default function ViewAiResponsePage({ formData, responseData }: props) {
  const { title, description } = formData;
  const { createdDate, creatorId, chatHistory } = responseData;
  const submissionDateString = new Date(createdDate).toLocaleDateString();

  return (
    <div className="flex flex-col justify-center items-center gap-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <div>Form Description: {description}</div>
          <div>Responder: {creatorId}</div>
          <div>Date of Response Submission: {submissionDateString}</div>
        </CardHeader>
      </Card>

      {chatHistory?.map((text, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle>{text.role}</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-row justify-start align-left w-full gap-4">
                <div className="flex flex-col justify-start space-y-1.5">
                  <div>{text.message}</div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
