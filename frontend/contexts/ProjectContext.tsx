"use client";

import manage_user_default_project from "@/database/manage_user_default_project";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface ProjectContextType {
    selectedProject: {
        id: string;
        name: string;
    };
    setSelectedProject: (project: { id: string; name: string }) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
    children: ReactNode;
    userId: string | null;
}

export function ProjectProvider({ children, userId }: ProjectProviderProps) {
    const storage = sessionStorage.getItem("selectedProject");
    const [selectedProject, setSelectedProject] = useState<{
        id: string;
        name: string;
    } | null>(storage ? JSON.parse(storage) : null);

    useEffect(() => {
        async function initializeProject() {
            if (userId && !selectedProject) {
                const { projectId, projectName } =
                    await manage_user_default_project(userId);
                setSelectedProject({ id: projectId, name: projectName });
            }
        }
        initializeProject();
    }, [userId]);

    useEffect(() => {
        sessionStorage.setItem(
            "selectedProject",
            JSON.stringify(selectedProject)
        );
    }, [selectedProject]);

    return (
        <ProjectContext.Provider
            value={{ selectedProject: selectedProject!, setSelectedProject }}
        >
            {children}
        </ProjectContext.Provider>
    );
}

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};
