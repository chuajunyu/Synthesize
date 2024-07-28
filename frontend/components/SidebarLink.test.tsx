import React from "react";
import { render, screen } from "@testing-library/react";
import SidebarLink from "./SidebarLink";

describe("SidebarLink component", () => {
  const mockProps = {
    href: "/test-page",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
        data-testid="icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
        />
      </svg>
    ),
    text: "Test Text",
  };

  describe("Rendering", () => {
    it("renders the correct text and icon", () => {
      render(<SidebarLink {...mockProps} />);

      const linkElement = screen.getByRole("link");
      expect(linkElement).toBeInTheDocument();

      const iconElement = screen.getByTestId("icon");
      expect(iconElement).toBeInTheDocument();

      expect(screen.getByText("Test Text"));
    });
  });

  describe("Interactivity", () => {
    it("clicking on sidebar routes to correct page", () => {
      render(<SidebarLink {...mockProps} />);
      expect(screen.getByRole("link")).toHaveAttribute("href", "/test-page");
    });
  });
});
