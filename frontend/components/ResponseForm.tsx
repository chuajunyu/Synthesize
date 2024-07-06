"use client";
import React, { useState } from "react";
import create_response from "@/database/create_response";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/firebase/AuthContext";

interface Question {
  text: string;
}

interface ResponseFormProps {
  title: string;
  description: string;
  questions: Question[];
  formId: string;
}

export default function ResponseForm({
  title,
  description,
  questions,
  formId,
}: ResponseFormProps) {
  const [responses, setResponses] = useState(
    questions?.map((question, index) => ({ id: index, response: "" }))
  );

  // Function to update the responses state based on user input
  const handleResponseChange = (id: number, response: string) => {
    setResponses((prevResponses) =>
      prevResponses.map((r) => (r.id === id ? { ...r, response } : r))
    );
  };

  const { user } = useAuth();
  
  // Function to submit a new response
  const handleSubmit = async () => {
    let email = user?.email ?? "";
    console.log(responses.length);
    const formattedResponses = responses.map((response) => ({
      responseId: response.id,
      response: response.response,
    }));
    // Call the create_response function here to create a form response in the datbase
    create_response(email, formId, formattedResponses);
    setResponses(
      questions?.map((question, index) => ({ id: index, response: "" }))
    );
    alert("Response submitted successfully");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-8 mt-10 mx-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
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
                <div className="flex flex-col justify-start w-full space-y-1.5">
                  <Label
                    htmlFor={`response-${index}`}
                    className="flex justify-start"
                  >
                    Answer here
                  </Label>
                  <Input
                    id={`response-${index}`}
                    placeholder="Untitled Question"
                    value={responses[index].response}
                    onChange={(e) =>
                      handleResponseChange(index, e.target.value)
                    }
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSubmit}>Submit Response</Button>
    </div>
  );
}
