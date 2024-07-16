import React from "react";
import {
    Card,
    CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const projects = [
  {
    Title: "Create a New Project",
    isAddCard: true,
  },
  {
    Title: "September Coffee Food Feedback",
  },
  {
    Title: "Package Pals User Research",
  },
  {
    Title: "Assurance Vouchers Benefits",
  },
  {
    Title: "Assurance Vouchers Benefits",
  },
];

export default function ProjectDisplay() {
    return (
      <div className="flex flex-wrap gap-12 mt-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="w-1/5 h-64 bg-white shadow-md rounded-lg flex flex-col justify-between items-center"
          >
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
                <Link href="/platform/projects/create">Create a New Project</Link>
              ) : (
                <Link href="/">{project.Title}</Link>
              )}
            </span>
          </div>
        ))}
      </div>
    );
}