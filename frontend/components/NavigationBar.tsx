import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import SidebarLink from "@/components/SidebarLink"; // Import the SidebarLink component
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UserDropDown from "./UserDropDown";
import read_user_projects, { ProjectTitle } from "@/database/read_user_projects";

const projectItems = [
  {
    href: "/platform/form",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    text: "Create a Form",
  },
  {
    href: "/platform/formsCreated",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    text: "Forms Created",
  },
  {
    href: "/platform/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-5 w-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    text: "Insights",
  },
];

interface NavigationBarProps {
  user: string;
  isNavbarOpen: boolean;
  toggleNavbarOpen: () => void;
}

export default function NavigationBar({ user, isNavbarOpen, toggleNavbarOpen }: NavigationBarProps) {
  const [projects, setProjects] = useState<ProjectTitle[]>([]);
  const [selectedProject, setSelectedProject] = useState("Default Project");
  const [isAccordionOpen, setIsAccordionOpen] = useState("false");

  useEffect(() => {
    // Save navbar state to local storage
    localStorage.setItem("isNavbarOpen", JSON.stringify(isNavbarOpen));
  }, [isNavbarOpen]);

  useEffect(() => {
    async function read_projects() {
      const user_projects = await read_user_projects(user);
      if (user_projects) {
        setProjects(user_projects);
      }
    }
    read_projects();
  }, [user])
  
  const handleCloseAccordion = () => {
    setIsAccordionOpen("");
  }

  return (
    <div className="h-screen w-25 bg-white dark:bg-slate-900">
      {isNavbarOpen ? (
        <div>
          <aside
            id="sidebar"
            className="fixed left-0 top-0 z-40 h-screen w-56 flex-shrink-0 border-r border-slate-300 bg-gradient-to-b from-purple-300 to-pink-300 dark:border-slate-700 dark:bg-slate-900"
            aria-label="Sidebar"
          >
            <div className="flex h-full flex-col overflow-y-auto  px-3 py-4 ">
              <div className="flex flex-row">
                <a
                  href="/"
                  className="mb-4 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                  </svg>
                  <span className="ml-3 text-xl font-semibold">Synthesize</span>
                </a>
                <svg
                  role="close-navbar"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#555555"
                  className="size-5 ml-4 mt-3"
                  onClick={toggleNavbarOpen}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                  />
                </svg>
              </div>
              <a
                href="/platform/homepage"
                className="flex items-left justify-start rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="ml-4 whitespace-nowrap text-2ms font-medium">
                  Home
                </span>
              </a>
              <Accordion
                type="single"
                collapsible
                className="mb-0 pb-0"
                value={isAccordionOpen}
                onValueChange={setIsAccordionOpen}
              >
                <AccordionItem value="item-1">
                  <div className="flex flex-row items-center mb-2">
                    <a
                      href="/platform/projects"
                      className="flex items-left justify-start rounded-lg py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700 pr-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 ml-2.5 mr-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                        />
                      </svg>
                      <span className="text-2sm font-medium">Projects</span>
                    </a>
                    <AccordionTrigger className="ml-4" asChild>
                      <button
                        onClick={() =>
                          setIsAccordionOpen(
                            isAccordionOpen === "item-1" ? "" : "item-1"
                          )
                        }
                      >
                        Toggle
                      </button>
                    </AccordionTrigger>
                  </div>
                  <div className="flex flex-row ml-11 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                      />
                    </svg>
                    <span className="w-full ml-4 text-left text-base font-medium truncate">
                      {selectedProject}
                    </span>
                  </div>
                  <AccordionContent>
                    <div className="flex flex-row ml-5">
                      <div className="flex flex-col items-center">
                        <Separator
                          orientation="vertical"
                          className="border-zinc-500 border-1"
                        />
                      </div>
                      <ul className="space-y-4 text-base ml-3 font-medium w-full">
                        {projects.map((project, index) => (
                          <SidebarLink
                            key={index}
                            icon={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                                />
                              </svg>
                            }
                            text={project.title}
                            setProject={setSelectedProject}
                            onClick={handleCloseAccordion}
                          />
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <ul className="space-y-4 text-2sm font-medium mt-4">
                {projectItems.map((item, index) => (
                  <SidebarLink
                    key={index}
                    href={item.href}
                    icon={item.icon}
                    text={item.text}
                  />
                ))}
              </ul>
              <div className="mt-auto flex pb-2">
                <div className="flex w-full justify-between">
                  <span className="text-sm font-medium text-black dark:text-white mr-1">
                    {user}
                  </span>
                  <UserDropDown />
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <svg
          role="open-navbar"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="absolute top-1/2 transform -translate-y-1/2 left-0 w-6 h-10 bg-purple-400 text-black rounded-r-xl border-5 z-10"
          onClick={toggleNavbarOpen}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </div>
  );
}
