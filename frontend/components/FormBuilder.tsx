"use client"

import React, { useState } from 'react';
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

function FormBuilder() {
  // State to manage multiple question cards
  const [questions, setQuestions] = useState([{ id: 1, question: "", type: "" }]);

  // Function to delete a question
  const handleDelete = (id: number) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  // Function to add a new question
  const handleAddNew = () => {
    const newId = questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;
    setQuestions([...questions, { id: newId, question: "", type: "" }]);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-8 mt-8">
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>Create a New Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col w-full space-y-4">
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="form-name">Form Name</Label>
                <Input id="form-name" placeholder="Form Name" />
              </div>
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="form-description">Form Description</Label>
                <Input id="form-description" placeholder="What is this form about?" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {questions.length === 0 && (
            <Button onClick={handleAddNew}>Add New Question</Button>
          )}
        </CardFooter>
      </Card>

      {questions.map((question, index) => (
        <Card key={index} className="w-[800px]">
          <CardHeader>
            <CardTitle>Create a New Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex w-full gap-4">
                <div className="flex flex-col w-3/4 space-y-1.5">
                  <Label htmlFor={`question-${index}`}>Question</Label>
                  <Input id={`question-${index}`} placeholder="Untitled Question" />
                </div>
                <div className="flex flex-col w-1/4 space-y-1.5">
                  <Label htmlFor={`question-type-${index}`}>Question Type</Label>
                  <Select>
                    <SelectTrigger id={`question-type-${index}`}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="multiple-choice">Multiple choice</SelectItem>
                      <SelectItem value="open-ended">Open ended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => handleDelete(question.id)} variant="outline">Delete Question</Button>
            {index === questions.length - 1 && (
              <Button onClick={handleAddNew}>Add New Question</Button>
            )}
          </CardFooter>
        </Card>
      ))}
       <Button>Create Form</Button>
    </div>
  );
}

export default FormBuilder;
