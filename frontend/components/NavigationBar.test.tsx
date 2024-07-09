import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavigationBar from "./NavigationBar";
import "@testing-library/jest-dom";

jest.mock("@/components/SidebarLink", () => () => (
  <div data-testid="sidebar-link"></div>
));

jest.mock("./UserDropDown", () => () => (
  <div data-testid="user-dropdown"></div>
));

const mockProps = {
  user: "Test User",
  isNavbarOpen: true,
  toggleNavbarOpen: jest.fn(),
};

describe("NavigationBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders NavigationBar with sidebar open", () => {
      render(<NavigationBar {...mockProps} />);

      // Check if sidebar is rendered
      expect(screen.getByLabelText("Sidebar")).toBeInTheDocument();

      // Check if user name is displayed
      expect(screen.getByText("Test User")).toBeInTheDocument();

      // Check if user dropdown is displayed
      expect(screen.getByTestId("user-dropdown")).toBeInTheDocument();

      // Check if close-navbar icon is displayed
      expect(screen.getByRole("close-navbar")).toBeInTheDocument();
    });

    it("renders project links in the sidebar", () => {
      render(<NavigationBar {...mockProps} />);

      // Check if all project links are rendered
      const projectLinks = screen.getAllByTestId("sidebar-link");
      expect(projectLinks.length).toBeGreaterThan(0); // Assuming there are project links
    });
  });

  describe("Interactivity", () => {
    it("button toggles navbar close and open on button click", () => {
      render(<NavigationBar {...mockProps} />);

      // Simulate click event to close sidebar
      const toggleButton = screen.getByRole("close-navbar");
      fireEvent.click(toggleButton);
      expect(mockProps.toggleNavbarOpen).toHaveBeenCalledTimes(1);

      // Re-render component with navbar closed
      render(<NavigationBar {...mockProps} isNavbarOpen={false} />);

      // Check if the open-navbar button is now rendered
      const openButton = screen.getByRole("open-navbar");
      expect(openButton).toBeInTheDocument();

      // Simulate click event to open sidebar
      fireEvent.click(openButton);
      expect(mockProps.toggleNavbarOpen).toHaveBeenCalledTimes(2); // called twice:
    });
  });
});
