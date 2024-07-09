import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserDropDown from "./UserDropDown";
import { useDispatch } from "react-redux";
import { sign_out } from "@/lib/firebase/sign_out";
import { setUser } from "@/redux/auth/authSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("@/lib/firebase/sign_out", () => ({
  sign_out: jest.fn(),
}));

jest.mock("@/redux/auth/authSlice", () => ({
  setUser: jest.fn(),
}));

describe("UserDropDown", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders button", () => {
      render(<UserDropDown />);
      expect(screen.getByTestId("dropdown-button")).toBeInTheDocument();
    });
  });

  describe("Interactivity", () => {
    it("opens the dropdown menu upon clicking button", () => {
      render(<UserDropDown />);

      const triggerButton = screen.getByTestId("dropdown-button");
      expect(triggerButton).toBeInTheDocument();

      // Simulate click event to open the dropdown menu
      fireEvent.click(triggerButton);

      // Check if the dropdown items are rendered
      waitFor(() => expect(screen.getByText("Profile")).toBeInTheDocument());
      waitFor(() => expect(screen.getByText("Settings")).toBeInTheDocument());
      waitFor(() => expect(screen.getByText("Log out")).toBeInTheDocument());
    });

    it("calls sign_out and dispatches setUser when Log out is clicked", () => {
      render(<UserDropDown />);

      const triggerButton = screen.getByTestId("dropdown-button");
      fireEvent.click(triggerButton);

      waitFor(() => fireEvent.click(screen.getByText("Log out")));
      waitFor(() => expect(sign_out).toHaveBeenCalled());
      waitFor(() => expect(dispatch).toHaveBeenCalledWith(setUser(null)));
    });
  });
});
