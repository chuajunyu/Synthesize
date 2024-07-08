import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import FormFooter from "./FormFooter";

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("FormFooter Component", () => {
    const mockHandleAddNew = jest.fn();
    const questions = [{ id: 1, question: "" }];

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("Rendering", () => {
        it("renders the the 'Add New Question' button when there are no questions", () => {
          render(<FormFooter questions={[]} handleAddNew={mockHandleAddNew} />);

          expect(screen.getByText("Add New Question")).toBeInTheDocument();
        });

        it("does not render the 'Add New Question' button when there is one question", () => {
            render(
                <FormFooter
                    questions={questions}
                    handleAddNew={mockHandleAddNew}
                />
            );

            expect(screen.queryByText("Add New Question")).not.toBeInTheDocument();
        });
    });

    describe("Interactivity", () => {
        it("calls handleAddNew when 'Add New Question' button is clicked", () => {
            render(<FormFooter questions={[]} handleAddNew={mockHandleAddNew} />);
        
            const addButton = screen.getByText("Add New Question");
            fireEvent.click(addButton);

            expect(mockHandleAddNew).toHaveBeenCalledTimes(1);
        });
    });
})