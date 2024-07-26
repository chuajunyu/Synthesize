"use client"
import React, { useState, useEffect } from "react";
import read_project_data, { ProjectProps } from "@/database/read_project"
import ViewProjectPage from "@/components/ViewProjectPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ViewProjects({ params }: { params: { projectId: string } }) {
    const [projectData, setProjectData] = useState<ProjectProps | null>(null);

    useEffect(() => {
      async function fetchFormData() {
        try {
          const data = await read_project_data(params.projectId);
          setProjectData(data);
        } catch (error) {
          console.log("error fetching project data");
        }
      }
      fetchFormData();
    }, [params.projectId]);

    return (
      <ProtectedRoute>
        <div className="flex min-h-screen">
          <div className="justify-center w-full mx-8 mt-10">
            <ViewProjectPage projectData={projectData} />
          </div>
        </div>
      </ProtectedRoute>
    );
}