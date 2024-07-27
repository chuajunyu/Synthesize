"use client";
import * as React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ShareButton from "@/components/ShareButton";
import Link from "next/link"

interface FormResponsesTableProps {
  responseData: { [key: string]: ResponseData };
  formId: string;
}

export interface ResponseData {
  userId: string;
  submissionDate: string;
}

interface ResponseSummary {
  responseId: string;
  creatorId: string;
  date: string;
}

export default function ResponsesTable({
  responseData,
  formId,
}: FormResponsesTableProps) {
  const formattedData: ResponseSummary[] = Object.keys(responseData).map(
    (key) => ({
      responseId: key,
      creatorId: responseData[key].userId,
      date: new Date(responseData[key].submissionDate).toLocaleDateString(),
    })
  );

  return (
    <div className="flex flex-col w-full gap-4 mb-3">
      {formattedData.map((response) => (
        <Card key={response.responseId} className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex w-full gap-4">
                <div className="grid flex-col justify-start text-sm items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                    />
                  </svg>
                </div>
                <div className="grid flex-col w-1/2 text-sm items-center gap-4">
                  <Link
                    href={`/platform/formsCreated/${formId}/${response.responseId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {response.creatorId}
                  </Link>
                </div>
                <div className="grid flex-col w-1/2 text-sm items-center gap-4">
                  {response.date}
                </div>
                <div className="grid flex-col justify-end r-0 text-sm items-right">
                  <ShareButton />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
