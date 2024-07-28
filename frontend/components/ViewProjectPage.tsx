import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectProps } from "@/database/read_project";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface ViewProjectProps {
    projectData: ProjectProps | null;
}

export default function ViewProjectPage({ projectData }: ViewProjectProps) {
  if (!projectData) {
    return <div>Loading...</div>;
  }
    
  const { createdDate, title, description, goals } = projectData;
  const createdDateString = new Date(createdDate).toLocaleDateString();

    return (
      <ProtectedRoute>
        <div className="w-full justify-center items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <span>Project Description: {description}</span>
              <span>Project Goals: {goals}</span>
              <span>Date of Project Creation: {createdDateString}</span>
            </CardHeader>
          </Card>
        </div>
      </ProtectedRoute>
    );
}