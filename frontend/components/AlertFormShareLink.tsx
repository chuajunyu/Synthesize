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
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AlertDialogComponentProps {
  handleSubmit: () => void;
  shareKey: string;
}

export default function AlertFormShareLink({
  handleSubmit,
  shareKey,
}: AlertDialogComponentProps) {
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
            {hrefOrigin.current}
            {usePathname()}/{shareKey}
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
