import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import FormBuilder from "./FormBuilder";
import { useAuth } from "@/lib/firebase/AuthContext";
import create_form from "@/database/create_form";

jest.mock("@/lib/firebase/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/database/create_form", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/components/AlertFormShareLink", () => (props: any) => (
  <div data-testid="alert-form-share-link" onClick={props.handleSubmit}>
    Share Link Component
  </div>
));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  CardFooter: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
}));

jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
}));

jest.mock("./FormTitleAndDescriptionCard", () => (props: any) => (
  <div data-testid="form-title-description-card">
    <input
      placeholder="Title"
      value={props.title}
      onChange={(e) => props.setTitle(e.target.value)}
    />
    <input
      placeholder="Description"
      value={props.description}
      onChange={(e) => props.setDescription(e.target.value)}
    />
  </div>
));

describe("FormBuilder Component", () => {
  const mockUser = { email: "test@example.com" };
  const mockUseAuth = useAuth as jest.Mock;

  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: mockUser, loading: false });
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders the component", () => {
      render(<FormBuilder />);
      expect(
        screen.getByTestId("form-title-description-card")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Create a New Open-ended Question")
      ).toBeInTheDocument();
      expect(screen.getByText("Question")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Ask an open-ended question")
      ).toBeInTheDocument();
      expect(screen.getByTestId("delete-question-button"));
      expect(screen.getByTestId("add-question-button"));
    });
  });

  describe("Interactivity", () => {
    it("adds and deletes a question", () => {
      render(<FormBuilder />);

      // Add a new question
      const addNewQuestionButton = screen.getByTestId("add-question-button");
      fireEvent.click(addNewQuestionButton);

      // Check if the new question is added
      const questionInputs = screen.getAllByText(
        "Create a New Open-ended Question"
      );
      expect(questionInputs.length).toBe(2);

      // Delete the first question
      const deleteButton = screen.getAllByTestId("delete-question-button")[0];
      fireEvent.click(deleteButton);

      // Check if the question is deleted
      expect(
        screen.getAllByText("Create a New Open-ended Question").length
      ).toBe(1);
    });

    it("handles form submission", async () => {
      const mockCreateForm = create_form as jest.Mock;
      mockCreateForm.mockReturnValue("test-key");

      render(<FormBuilder />);

      const titleInput = screen.getByPlaceholderText("Title");
      const descriptionInput = screen.getByPlaceholderText("Description");
      const addNewQuestionButton = screen.getByTestId("add-question-button");
      const submitButton = screen.getByTestId("alert-form-share-link");

      // Fill the form
      fireEvent.change(titleInput, { target: { value: "Test Title" } });
      fireEvent.change(descriptionInput, {
        target: { value: "Test Description" },
      });
      fireEvent.click(addNewQuestionButton);
      fireEvent.change(
        screen.getAllByPlaceholderText("Ask an open-ended question")[1],
        { target: { value: "Test Question 1" } }
      );

      // Submit the form
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockCreateForm).toHaveBeenCalledWith(
          "test@example.com",
          "Test Title",
          "Test Description",
          [
            {
              text: "",
            },
            {
              text: "Test Question 1",
            },
          ]
        );
        expect(screen.getByPlaceholderText("Title")).toHaveValue("");
        expect(screen.getByPlaceholderText("Description")).toHaveValue("");
        expect(
          screen.getAllByText("Create a New Open-ended Question").length
        ).toBe(1);
      });
    });
  });
});
