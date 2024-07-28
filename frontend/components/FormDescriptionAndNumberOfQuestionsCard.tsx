import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AIFormFooter from "./AIFormFooter";

interface FormDescriptionAndNumberOfQuestionsCardProps {
  description: string;
    setDescription: (description: string) => void;
    numberOfQuestions: number;
    setNumberOfQuestions: (numberOfQuestions: number) => void;
  information: { id: number; information: string }[];
  handleAddNew: () => void;
}

export default function FormDescriptionAndNumberOfQuestionsCard({
  description,
  setDescription,
  numberOfQuestions,
  setNumberOfQuestions,
  information,
  handleAddNew,
}: FormDescriptionAndNumberOfQuestionsCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create a New AI Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col w-full space-y-4">
            <div className="flex flex-col w-full space-y-1">
              <Label
                htmlFor="form-title"
                className="flex justify-start font-medium text-lg"
              >
                Form Context/Description
              </Label>
              <Input
                id="form-description"
                placeholder="Provide description or context for creating this form."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <Label
                htmlFor="form-description"
                className="flex justify-start font-medium text-lg"
              >
                Desired Number of Questions
              </Label>
              <Input
                id="form-numberOfQuestions"
                placeholder="Give the target number of questions you want in the AI form."
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.valueAsNumber)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AIFormFooter information={information} handleAddNew={handleAddNew} />
      </CardFooter>
    </Card>
  );
}
