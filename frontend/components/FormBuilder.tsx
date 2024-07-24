"use client";
import React, {
  useState,
} from "react";
import create_form from "@/database/create_form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/firebase/AuthContext";
import AlertFormShareLink from "@/components/AlertFormShareLink";
import FormTitleAndDescriptionCard from "./FormTitleAndDescriptionCard";
import { useProject } from "@/contexts/ProjectContext";

export default function FormBuilder() {
  const { selectedProject } = useProject();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([{ id: 1, question: "" }]);
  const [key, setKey] = useState<string>("");

  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to handle adding user input to the questions state
  const handleInputChange = (id: number, field: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, [field]: value } : question
      )
    );
  };

  // Function to delete a question based on the question's id
  const handleDelete = (id: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  // Function to add a new question at the end of the list of questions
  const handleAddNew = () => {
    const newId =
      questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;
    setQuestions([...questions, { id: newId, question: "" }]);
  };

  // Function to handle submitting a new form
  const handleSubmit = async () => {
    const email = user?.email ?? "";
    const formattedQuestions = questions.map((question) => ({
      text: question.question,
    }));
    // Call the backend create_form function here to store form data in database
    const newKey = create_form(
        email,
        title,
        description,
        formattedQuestions,
        selectedProject.id
      );
    setKey(newKey);
    // set the page back to its original state
    setTitle("");
    setDescription("");
    setQuestions([{ id: 1, question: "" }]);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-8 mx-8 mt-10">
      <FormTitleAndDescriptionCard
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        questions={questions}
        handleAddNew={handleAddNew}
      />

      {questions.map((question) => (
        <Card key={question.id} className="w-full">
          <CardHeader>
            <CardTitle>Create a New Open-ended Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-row justify-start align-left w-full gap-4">
                <div className="flex flex-col justify-start w-full space-y-1.5">
                  <Label
                    htmlFor={`question-${question.id}`}
                    className="flex justify-start font-medium text-lg"
                  >
                    Question
                  </Label>
                  <Input
                    id={`question-${question.id}`}
                    placeholder="Ask an open-ended question"
                    value={question.question}
                    onChange={(e) =>
                      handleInputChange(question.id, "question", e.target.value)
                    }
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              data-testid="delete-question-button"
              onClick={() => handleDelete(question.id)}
              variant="outline"
            >
              Delete Question
            </Button>
            {question.id === questions[questions.length - 1].id && (
              <Button
                data-testid="add-question-button"
                onClick={handleAddNew}
              >
                Add New Question
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
      <AlertFormShareLink handleSubmit={handleSubmit} shareKey={key} />
    </div>
  );
}