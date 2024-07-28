import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUp from "@/components/auth/SignUp"; // Adjust the import path as needed

// Mock the dependencies
jest.mock("@/components/auth/EmailSignUp", () => {
    return jest.fn(() => <div>EmailSignUp Component</div>);
});
jest.mock("@/components/authFunctions", () => ({
    SignInGoogle: jest.fn(() => <div>SignInGoogle Component</div>),
}));
jest.mock("next/link", () => ({
    __esModule: true,
    default: ({
        children,
        href,
    }: {
        children: React.ReactNode;
        href: string;
    }) => <a href={href}>{children}</a>,
}));

describe("SignUp Page Component", () => {
    test("renders sign-up page correctly", () => {
        render(<SignUp />);

        // Check if the main heading is present
        expect(screen.getByText("Sign Up")).toBeInTheDocument();

        // Check for the subheading
        expect(
            screen.getByText("Select one of the following sign-up methods")
        ).toBeInTheDocument();

        // Check for the EmailSignUp component
        expect(screen.getByText("EmailSignUp Component")).toBeInTheDocument();

        // Check for the SignInGoogle component
        expect(screen.getByText("SignInGoogle Component")).toBeInTheDocument();

        // Check for the log-in link
        expect(
            screen.getByText("Already have an account?")
        ).toBeInTheDocument();
    });

    test("renders the log-in link with the correct href", () => {
        render(<SignUp />);

        // Check the href of the log-in link
        const logInLink = screen.getByText("Log in");
        expect(logInLink.closest("a")).toHaveAttribute("href", "login");
    });
});
