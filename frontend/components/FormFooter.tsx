import React from "react";
import { Button } from "@/components/ui/button";

interface FormFooterProps {
    questions: { id: number; question: string }[],
    handleAddNew: () => void
}

export default function FormFooter({ questions, handleAddNew }:FormFooterProps) {
    return (
      <div>
        {questions.length === 0 && (
          <Button onClick={handleAddNew}>Add New Question</Button>
        )}
      </div>
    );
}
