import React, { useRef, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertDialogComponentProps {
  handleSubmit: () => void;
  shareKey: string;
  isManualForm: boolean;
  selectedProject: string
}

export default function AlertFormShareLink({
  handleSubmit,
  shareKey,
  isManualForm,
  selectedProject
}: AlertDialogComponentProps) {
  console.log(selectedProject);
  const descriptionRef = useRef<HTMLDivElement>(null); // Reference to the AlertDialogDescription
  let hrefOrigin = useRef<string | undefined>();

  useEffect(() => {
    hrefOrigin.current = window.location.origin;
  }, []);

  // Function to handle the copy to clipboard feature
  const handleCopyToClipboard = () => {
    if (descriptionRef.current) {
      navigator.clipboard
        .writeText(descriptionRef.current.innerText)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    }
  };
  console.log(selectedProject);
  const link = isManualForm
    ? `${hrefOrigin.current}/platform/form/manualForm/${shareKey}`
    : `${hrefOrigin.current}/platform/chat/${selectedProject}/${shareKey}`;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button onClick={handleSubmit}>Create Form</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Share the link with your survey participants!
          </AlertDialogTitle>
          <AlertDialogDescription ref={descriptionRef}>
            {link}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCopyToClipboard}>
            Copy Link
          </AlertDialogCancel>
          <AlertDialogAction>Exit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
