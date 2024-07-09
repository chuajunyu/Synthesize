import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailSignUp from "@/components/auth/EmailSignUp";
import { signUpWithEmailAndPassword } from "@/lib/firebase/auth_email_password";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

// Mock the signUpWithEmailAndPassword function
jest.mock("@/lib/firebase/auth_email_password", () => ({
    signUpWithEmailAndPassword: jest.fn(),
}));

describe("EmailSignUp Component", () => {
    it("renders email sign-up form correctly", () => {
        render(<EmailSignUp />);

        // Check if email input is present
        expect(screen.getByLabelText("Email")).toBeInTheDocument();

        // Check if password input is present
        expect(screen.getByLabelText("Password")).toBeInTheDocument();

        // Check if sign-up button is present
        expect(
            screen.getByRole("button", { name: "Sign Up" })
        ).toBeInTheDocument();
    });

    it("submits the form correctly", async () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        render(<EmailSignUp />);

        // Mock signUpWithEmailAndPassword function to return success
        (signUpWithEmailAndPassword as jest.Mock).mockResolvedValue("success");

        // Fill out form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        // Wait for form submission to complete
        await waitFor(() => {
            expect(signUpWithEmailAndPassword).toHaveBeenCalledWith(
                "test@example.com",
                "password123"
            );
            expect(pushMock).toHaveBeenCalledWith("/platform/form");
        });
    });

    it("displays error message on failed login", async () => {
        render(<EmailSignUp />);

        // Mock logInWithEmailAndPassword function to return error
        (signUpWithEmailAndPassword as jest.Mock).mockResolvedValue("Invalid email or password");

        // Fill out form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        // Wait for form submission to complete
        await waitFor(() => {
            expect(signUpWithEmailAndPassword).toHaveBeenCalledWith(
                "test@example.com",
                "password123"
            );
            const errorMessage = screen.getByText("Invalid email or password");
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it("displays server error message on server error", async () => {
        render(<EmailSignUp />);

        // Mock logInWithEmailAndPassword function to throw an error
        (signUpWithEmailAndPassword as jest.Mock).mockRejectedValue("Server error");

        // Fill out form fields
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        // Wait for form submission to complete
        await waitFor(() => {
            expect(signUpWithEmailAndPassword).toHaveBeenCalledWith(
                "test@example.com",
                "password123"
            );
            const errorMessage = screen.getByText("A server error occurred. Please try again.");
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
