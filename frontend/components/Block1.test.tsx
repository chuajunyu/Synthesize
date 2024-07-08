import React from "react";
import { render, screen } from "@testing-library/react";
import Block1 from "@/components/Block1";

describe("Block1 component", () => {
  const mockProps = {
    title: "Test Title",
    text: "Test description text",
    showButton: false,
    buttonText: "Click Me",
    href: "/test-link",
  };

  describe("Rendering", () => {
    it("renders the title and text", () => {
      render(<Block1 {...mockProps} />);
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test description text")).toBeInTheDocument();
    });

    it("renders the button when showButton is true", () => {
      render(<Block1 {...mockProps} showButton={true} />);
      expect(screen.getByRole("link")).toHaveAttribute("href", "/test-link");
      expect(screen.getByText("Click Me")).toBeInTheDocument();
    });

    it("does not render the button when showButton is false", () => {
      render(<Block1 {...mockProps} />);
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.queryByText("Click Me")).not.toBeInTheDocument();
    });
  });

  describe("Interactivity", () => {
    it("button routes to the correct page", () => {
      render(<Block1 {...mockProps} showButton={true} />);
      expect(screen.getByRole("link")).toHaveAttribute("href", "/test-link");
    });
  });
});
