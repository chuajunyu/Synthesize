"use client"
import React, { useState, useRef, useEffect } from 'react';
import { auth } from "@/components/authFunctions";  
import create_form from "@/database/create_form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { usePathname } from 'next/navigation';

function FormBuilder() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  // State to manage multiple question cards
  const [questions, setQuestions] = useState([{ id: 1, question: "", type: "" }]);
  const [key, setKey] = useState<string | null>('');
  
  const descriptionRef = useRef<HTMLDivElement>(null); // Reference to the AlertDialogDescription

  // Function to delete a question
  const handleDelete = (id: number) => {
    setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
  };

  const handleAddNew = () => {
    const newId = questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;
    setQuestions([...questions, { id: newId, question: "", type: "" }]);
  };

  // Function to add a new question
  const handleSubmit = async () => {
    // Call the create_form function here
    let session = await auth();
    let user = session?.user?.email ?? "";
    const formattedQuestions = questions.map(question => ({
      text: question.question,
      type: question.type
    }));
    setKey(create_form(user, title, description, formattedQuestions));
    setTitle("");
    setDescription("");
    setQuestions([{ id: 1, question: "", type: "" }]);
  }

  const handleInputChange = (id: number, field: string, value: string) => {
    setQuestions(prevQuestions => prevQuestions.map(question => 
      question.id === id ? { ...question, [field]: value } : question
    ));
  };

  const handleCopyToClipboard = () => {
    if (descriptionRef.current) {
      navigator.clipboard.writeText(descriptionRef.current.innerText)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    }
  };

  let hrefOrigin = useRef<string | undefined>();

  useEffect(() => {
    hrefOrigin.current = window.location.origin;
  }, []);

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
                <Label htmlFor="form-name" className="flex justify-start">Form Name</Label>
                <Input 
                  id="form-name" 
                  placeholder="Form Name" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="form-description" className="flex justify-start">Form Description</Label>
                <Input 
                  id="form-description" 
                  placeholder="What is this form about?" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
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

      {questions.map((question) => (
        <Card key={question.id} className="w-[800px]">
          <CardHeader>
            <CardTitle>Create a New Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-row justify-start align-left w-full gap-4">
                <div className="flex flex-col justify-start w-3/4 space-y-1.5">
                  <Label htmlFor={`question-${question.id}`} className="flex justify-start">Question</Label>
                  <Input 
                    id={`question-${question.id}`} 
                    placeholder="Untitled Question" 
                    value={question.question}
                    onChange={(e) => handleInputChange(question.id, 'question', e.target.value)}
                  />
                </div>
                <div className="flex flex-col justify-start w-1/4 space-y-1.5">
                  <Label htmlFor={`question-type-${question.id}`} className="flex justify-start">Question Type</Label>
                  <Select 
                    value={question.type}
                    onValueChange={(value) => handleInputChange(question.id, 'type', value)}
                  >
                    <SelectTrigger id={`question-type-${question.id}`}>
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
            {question.id === questions[questions.length - 1].id && (
              <Button onClick={handleAddNew}>Add New Question</Button>
            )}
          </CardFooter>
        </Card>
      ))}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button onClick={handleSubmit}>Create Form</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share the link with your survey participants!</AlertDialogTitle>
            <AlertDialogDescription ref={descriptionRef}>
              {hrefOrigin.current}{usePathname()}/{key}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCopyToClipboard}>Copy Link</AlertDialogCancel>
            <AlertDialogAction>Exit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FormBuilder;
