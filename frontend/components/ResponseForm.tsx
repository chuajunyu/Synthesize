import React, { useState, useRef, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ResponseForm(title: string, description: string, questions: any[]) {
    const [responses, setResponses] = useState(
        questions.map(question => ({ id: question.id, response: "" }))
      );

    const handleResponseChange = (id: number, response: string) => {
        setResponses(prevResponses =>
          prevResponses.map(r =>
            r.id === id ? { ...r, response } : r
          )
        );
      };
    return (
        <div className="flex flex-col justify-center items-center gap-y-8 mt-8">
        <Card className="w-[800px]">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        </Card>

    {questions.map((question) => (
        <Card key={question.id} className="w-[800px]">
          <CardHeader>
            <CardTitle>{question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-row justify-start align-left w-full gap-4">
                <div className="flex flex-col justify-start w-3/4 space-y-1.5">
                  <Label htmlFor={`response-${responses.id}`} className="flex justify-start">Answer here</Label>
                  <Input 
                    id={`response-${responses.id}`} 
                    placeholder="Untitled Question" 
                    value={responses.response}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
