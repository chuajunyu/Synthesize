"use client"
import React, { useState } from 'react';
import { auth } from "@/components/authFunctions";  
import create_response from "@/database/create_response";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

interface props {formData: FormProps; responseData: ResponseDataProps}

export default function ViewResponsePage({formData, responseData}: props) {
  const {title, description, questions } = formData;
  const {answers, submissionDate, userId} = responseData;
  const submissionDateString = new Date(submissionDate).toLocaleDateString()
  console.log(answers[0])
  return (
        <div className="flex flex-col justify-center items-center gap-y-8 mt-8">
        <Card className="w-[800px]">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <div>Date Submitted: {submissionDateString}</div>
            <div>Responder: {userId} </div>
        </CardHeader>
        </Card>

    {questions?.map((question, index) => (
        <Card key={index} className="w-[800px]">
          <CardHeader>
            <CardTitle>{question.text}</CardTitle>
          </CardHeader>
        <CardContent>
            <form>
                <div className="flex flex-row justify-start align-left w-full gap-4">
                    <div className="flex flex-col justify-start w-3/4 space-y-1.5">
                        <div>{String(answers[index].response)}</div>
                    </div>
                </div>
            </form>
        </CardContent>
        </Card>
      ))}
    </div>
  )
}