"use client"
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import read_user_projects, { ProjectTitle } from "@/database/read_user_projects";
import { useAuth } from "@/lib/firebase/AuthContext";
import delete_project from "@/database/delete_project";

export default function ProjectDisplay() {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [projectTitles, setProjectTitles] = useState<ProjectTitle[]>([]);

  useEffect(() => {
    async function authenticate() {
      const email = user?.email ?? "";
      setUserEmail(email);
    }
    authenticate();
  }, [user?.email]);

  const handleDeleteProject = useCallback((id: string) => {
    delete_project(id)
      .then(() => {
        setProjectTitles((prevTitles) =>
          prevTitles.filter((project) => project.projectId !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting project: ", error);
      });
  }, []);


  useEffect(() => {
    async function fetchProjects() {
      if (userEmail !== null) {
        const projects = await read_user_projects(userEmail);
        console.log(projects);
        setProjectTitles(projects ?? []);
        setLoading(false);
      }
    }
    fetchProjects();
  }, [userEmail, handleDeleteProject]);

  const projectsToDisplay = [
    { title: "Create a New Project", isAddCard: true, projectId: "", binIcon: false},
    ...projectTitles.map((project) => ({
      title: project.title,
      isAddCard: false,
      projectId: project.projectId,
      binIcon: project.title !== "Default Project"
    })),
  ];

  if (loading) {
    return <div>Loading...</div>
  }

    return (
      <div className="flex flex-wrap gap-12 mt-5">
        {projectsToDisplay.map((project, index) => (
          <div
            key={index}
            className="w-1/5 h-64 bg-white shadow-md rounded-lg flex flex-col"
          >
            {!project.isAddCard && project.binIcon? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 self-end mt-2 mr-2"
                onClick={() => handleDeleteProject(project.projectId)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            ) : (
              <div className="mt-8 mr-8"></div>
            )}
            <div className="flex-grow flex justify-center items-center">
              {project.isAddCard ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                  />
                </svg>
              )}
            </div>
            <span className="w-full text-center truncate px-2 py-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-b-lg text-blue-600 hover:underline">
              {project.isAddCard ? (
                <Link href="/platform/projects/create">
                  Create a New Project
                </Link>
              ) : (
                <Link href={`/platform/projects/${project.projectId}`}>
                  {project.title}
                </Link>
              )}
            </span>
          </div>
        ))}
      </div>
    );
}