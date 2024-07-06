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
import FormFooter from "@/components/FormFooter"

interface FormTitleAndDescriptionCardProps {
  title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    questions: { id: number; question: string }[];
    handleAddNew: () => void;
}

export default function FormTitleAndDescriptionCard({ title, setTitle, description, setDescription, questions, handleAddNew }:FormTitleAndDescriptionCardProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create a New Form</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col w-full space-y-4">
                        <div className="flex flex-col w-full space-y-1">
                            <Label
                                htmlFor="form-title"
                                className="flex justify-start font-medium text-lg"
                            >
                                Form Title
                            </Label>
                            <Input
                                id="form-title"
                                placeholder="Provide a title for your form"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full space-y-1">
                            <Label
                                htmlFor="form-description"
                                className="flex justify-start font-medium text-lg"
                            >
                                Form Description
                            </Label>
                            <Input
                                id="form-description"
                                placeholder="Provide a description of your form for the respondents"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <FormFooter questions={questions} handleAddNew={handleAddNew} />
            </CardFooter>
        </Card>
    );
}