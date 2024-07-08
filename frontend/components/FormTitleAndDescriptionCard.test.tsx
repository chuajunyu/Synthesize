import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormTitleAndDescriptionCard from "./FormTitleAndDescriptionCard";

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardFooter: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h2>{children}</h2>,
}));

jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
}));

jest.mock("@/components/FormFooter", () => (props: any) => (
  <div>
    Form Footer Component
    <button onClick={props.handleAddNew}>Add New Question</button>
  </div>
));

describe("FormTitleAndDescriptionCard Component", () => {
  const mockSetTitle = jest.fn();
  const mockSetDescription = jest.fn();
  const mockHandleAddNew = jest.fn();
  const questions = [{ id: 1, question: "" }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders the component", () => {
      render(
        <FormTitleAndDescriptionCard
          title=""
          setTitle={mockSetTitle}
          description=""
          setDescription={mockSetDescription}
          questions={questions}
          handleAddNew={mockHandleAddNew}
        />
      );

      expect(screen.getByText("Create a New Form")).toBeInTheDocument();
      expect(screen.getByLabelText("Form Title")).toBeInTheDocument();
      expect(screen.getByLabelText("Form Description")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Provide a title for your form")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(
          "Provide a description of your form for the respondents"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Form Footer Component")).toBeInTheDocument();
    });
  });

  describe("Interactivity", () => {
    it("updates title on input change", () => {
      render(
        <FormTitleAndDescriptionCard
          title=""
          setTitle={mockSetTitle}
          description=""
          setDescription={mockSetDescription}
          questions={questions}
          handleAddNew={mockHandleAddNew}
        />
      );

      const titleInput = screen.getByPlaceholderText(
        "Provide a title for your form"
      );
      fireEvent.change(titleInput, { target: { value: "New Form Title" } });

      expect(mockSetTitle).toHaveBeenCalledWith("New Form Title");
    });

    it("updates description on input change", () => {
      render(
        <FormTitleAndDescriptionCard
          title=""
          setTitle={mockSetTitle}
          description=""
          setDescription={mockSetDescription}
          questions={questions}
          handleAddNew={mockHandleAddNew}
        />
      );

      const descriptionInput = screen.getByPlaceholderText(
        "Provide a description of your form for the respondents"
      );
      fireEvent.change(descriptionInput, {
        target: { value: "New Form Description" },
      });

      expect(mockSetDescription).toHaveBeenCalledWith("New Form Description");
    });

    it("calls handleAddNew when add new question button is clicked", () => {
      render(
        <FormTitleAndDescriptionCard
          title=""
          setTitle={mockSetTitle}
          description=""
          setDescription={mockSetDescription}
          questions={questions}
          handleAddNew={mockHandleAddNew}
        />
      );

      const addNewQuestionButton = screen.getByText("Add New Question");
      fireEvent.click(addNewQuestionButton);

      expect(mockHandleAddNew).toHaveBeenCalled();
    });
  });
});