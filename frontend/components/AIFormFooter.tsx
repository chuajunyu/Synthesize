import React from "react";
import { Button } from "@/components/ui/button";

interface AIFormFooterProps {
  information: { id: number; information: string }[];
  handleAddNew: () => void;
}

export default function FormFooter({ information, handleAddNew }: AIFormFooterProps) {
  return (
    <div>
      {information.length === 0 && (
        <Button onClick={handleAddNew}>Add New Information</Button>
      )}
    </div>
  );
}
