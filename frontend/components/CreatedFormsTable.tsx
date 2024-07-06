"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { delete_form } from "../database/delete_form";
import { useAuth } from "@/lib/firebase/AuthContext";
import { readUserForms } from "@/database/read_user_forms";

interface MyFormData {
  createdDate: string;
  title: string;
}

interface FormSummary {
  id: string;
  title: string;
  date: string;
}

// InitialformData: Object with form IDs as keys and form details (title, createdDate) as values.
export function CreatedFormsTable() {
  const [formData, setFormData] = useState<{
    [key: string]: MyFormData;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    async function authenticate() {
      const email = user?.email ?? "";
      setUserEmail(email);
    }
    authenticate();
  }, [user?.email]);

  useEffect(() => {
    async function fetchData() {
      if (userEmail !== null) {
        const data = await readUserForms(userEmail);
        console.log(data);
        setFormData(data);
        setLoading(false);
      }
    }
    fetchData();
  }, [userEmail]);

  let hrefOrigin = useRef<string | undefined>();

  useEffect(() => {
    hrefOrigin.current = window.location.origin;
  }, []);

  const handleCopyLink = (formId: string) => {
    const pathName = "/platform/form/manualForm";
    const dynamicResponseLink = `${hrefOrigin.current}${pathName}/${formId}`;
    navigator.clipboard
      .writeText(dynamicResponseLink)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const handleDeleteForm = async (formId: string) => {
    try {
      await delete_form(formId);
      setFormData((prevFormData) => {
        const newFormData = { ...prevFormData };
        delete newFormData[formId];
        return newFormData;
      });
      alert("Form deleted successfully.");
    } catch (error) {
      alert("Failed to delete the form.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!formData) {
    return <div>No forms found</div>;
  }

  // Function converts formData object to an array of FormSummary objects with id, title, and formatted date
  // Returns an array of FormSummary objects.
  const formattedData: FormSummary[] = Object.keys(formData).map((key) => ({
    id: key,
    title: formData[key].title,
    date: new Date(formData[key].createdDate).toLocaleDateString(),
  }));

  return (
    <div className="flex flex-col w-full gap-4 mb-3">
      {formattedData.map((item) => (
        <Card key={item.id} className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex w-full gap-4">
                <div className="grid justify-start text-sm items-center gap-4">
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
                  <a
                    href={`/platform/formsCreated/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.title}
                  </a>
                </div>
                <div className="flex-col w-1/2 text-sm items-center gap-4">
                  {item.date}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                  onClick={() => handleCopyLink(item.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                  onClick={() => handleDeleteForm(item.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
