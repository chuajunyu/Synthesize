"use client";

import React from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/firebase/AuthContext";
import ProjectDisplay from "@/components/ProjectDisplay";

export default function ProjectsPage() {
  const { user } = useAuth();
  const name = user?.displayName;

    return (
      <ProtectedRoute>
        <div className="flex min-h-screen">
          <div className="flex-grow flex-col mx-8 justify-center mt-5">
            <span className="flex mt-3 mb-3 text-xl font-semibold">
              View Your Created Projects or Create a New Project, {name}
            </span>
            <div className="">
                <ProjectDisplay />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
}
