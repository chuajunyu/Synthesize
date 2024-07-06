"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Question {
  text: string;
}

interface FormProps {
  title: string;
  description: string;
  questions: Question[];
  createdDate: number;
  creatorId: string;
}

interface Answer {
  response: string;
}

interface ResponseDataProps {
  answers: Answer[];
  submissionDate: number;
  userId: string;
}

interface props {
  formData: FormProps;
  responseData: ResponseDataProps;
}

export default function ViewResponsePage({ formData, responseData }: props) {
  const { title, description, questions } = formData;
  const { answers, submissionDate, userId } = responseData;
  const submissionDateString = new Date(submissionDate).toLocaleDateString();

  return (
    <div className="flex flex-col justify-center items-center gap-y-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <div>Form Description: {description}</div>
          <div>Responder: {userId}</div>
          <div>Date of Response Submission: {submissionDateString}</div>
        </CardHeader>
      </Card>

      {questions?.map((question, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle>{question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-row justify-start align-left w-full gap-4">
                <div className="flex flex-col justify-start space-y-1.5">
                  <div>{String(answers[index].response)}</div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}