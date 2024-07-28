"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/firebase/AuthContext";
import create_project from "@/database/create_project";
import { useRouter } from 'next/navigation';

export default function ProjectBuilder() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");

  const charLimit = 300;

  const { user } = useAuth();

  const handleSubmit = async () => {
    if (title.length == 0) {
      alert("The project title cannot be empty. Please try again.");
    }
    else {
      const email = user?.email ?? "";
      // logic for submitting a new project and redirecting back to homepage
      create_project(email, title, description, goal)
        .then(() => {
          console.log("Project created successfully, routing back to projects page");
          router.push("/platform/projects");
        })
        .catch((error) => {
          console.log("Error creating project: ", error);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-8 mx-8 mt-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create a New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-row justify-start align-left w-full gap-4">
              <div className="flex flex-col justify-start w-full space-y-8">
                <div>
                  <Label className="flex justify-start font-medium text-lg">
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Lola's Cafe new outlet in Tampines"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Input>
                  {title.length == 0 && 
                    <div className="text-left text-red-500 font small text-sm">
                      This field is required. 
                    </div>}
                </div>
                <div>
                  <Label className="flex justify-start font-medium text-lg">
                    Project Description (max 300 characters)
                  </Label>
                  <Label className="flex justify-start font-small text-sm text-rose-800 mb-2">
                    This information will be used by the LLM when generating
                    insights. Note that giving accurate information will enhance
                    the quality of your derived insights.
                  </Label>
                  <Input
                    id="description"
                    placeholder="e.g., Lola's Cafe is a neighbourhood cafe. Our new store at Tampines located in the heartlands, inside Tampines Mall."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full p-2 border rounded ${
                      description.length > charLimit ? "border-red-500" : ""
                    }`}
                  ></Input>
                  {description.length > charLimit ? (
                    <div className="flex flex-row justify-between w-full mt-1">
                      <div className="text-left text-red-500 text-sm">
                        Character limit exceeded!
                      </div>
                      <div className="text-right font-small text-sm text-red-500">
                        {description.length}/{charLimit} characters
                      </div>
                    </div>
                  ) : (
                    <div className="text-right font-small text-sm text-gray-500 w-full mt-1">
                      {description.length}/{charLimit} characters
                    </div>
                  )}
                </div>
                <div>
                  <Label className="flex justify-start font-medium text-lg">
                    Project Goals (max 300 characters)
                  </Label>
                  <Label className="flex justify-start font-small text-sm text-rose-800 mb-2">
                    This information will be used by the LLM when generating
                    insights. Note that giving accurate information will enhance
                    the quality of your derived insights.
                  </Label>
                  <Input
                    id="goals"
                    placeholder="e.g., My team plans to hit $100k/month of revenue. We want to validate our new dishes - Crab Rigatoni and Seafood Laksa - among the Tampines customers."
                    value={goal}
                    onChange={(e) => {
                      setGoal(e.target.value);
                    }}
                    className={`w-full p-2 border rounded ${
                      goal.length > charLimit ? "border-red-500" : ""
                    }`}
                  ></Input>
                  {goal.length > charLimit ? (
                    <div className="flex flex-row justify-between w-full mt-1">
                      <div className="text-left text-red-500 text-sm">
                        Character limit exceeded!
                      </div>
                      <div className="text-right font-small text-sm text-red-500">
                        {goal.length}/{charLimit} characters
                      </div>
                    </div>
                  ) : (
                    <div className="text-right font-small text-sm text-gray-500 w-full mt-1">
                      {goal.length}/{charLimit} characters
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Button onClick={handleSubmit}>Create Project</Button>
    </div>
  );
}
