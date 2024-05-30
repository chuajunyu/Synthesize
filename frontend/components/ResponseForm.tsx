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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Question {
    type: string;
    text: string;
  }
  
  interface ResponseFormProps {
    title: string;
    description: string;
    questions: Question[];
    formId: string;
  }

export default function ResponseForm({ title, description, questions, formId }: ResponseFormProps) {
    const [responses, setResponses] = useState(
        questions?.map((question, index) => ({ id: index, response: "" }))
      );

    console.log(questions)
    const handleResponseChange = (id: number, response: string) => {
        setResponses(prevResponses =>
          prevResponses.map(r =>
            r.id === id ? { ...r, response } : r
          )
        );
      };

    // Function to submit a new response
    const handleSubmit = async () => {
      // Call the create_form function here
      let session = await auth();
      let user = session?.user?.email ?? "";
      const formattedResponses = responses.map(response => ({
        responseId: response.id,
        response: response.response
      }));
      create_response(user, formId, formattedResponses);
      setResponses([{ id: 1, response: ""}]);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-y-8 mt-8">
        <Card className="w-[800px]">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
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
                        <Label htmlFor={`response-${index}`} className="flex justify-start">Answer here</Label>
                        <Input 
                            id={`response-${index}`} 
                            placeholder="Untitled Question" 
                            value={responses[index].response}
                            onChange={(e) => handleResponseChange(index, e.target.value)}
                        />
                    </div>
                </div>
            </form>
        </CardContent>
        </Card>
      ))}
      <Button onClick={handleSubmit}>Submit Response</Button>
    </div>
  )
}
