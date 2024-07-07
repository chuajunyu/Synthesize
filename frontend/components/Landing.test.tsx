import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import Landing from "@/components/Landing";

describe("Landing Page Component", () => {
    describe("Rendering", () => {
        it("renders the navigation bar with website name", () => {
            render(<Landing />);
            const navigationBar = screen.getByRole("navigation-bar");
            const websiteName = within(navigationBar).getByRole("heading", {
                name: /synthesize/i,
            });
            expect(navigationBar).toBeInTheDocument();
            expect(websiteName).toBeInTheDocument();
        });

        it("renders a login button in navigation bar", () => {
            render(<Landing />);
            const navigationbar = screen.getByRole("navigation-bar");
            const loginButton = within(navigationbar).getByRole("button", {
                name: /login/i,
            });
            expect(loginButton).toBeInTheDocument();
        });

        it("renders main content with the value proposition", () => {
            render(<Landing />);
            const mainContent = screen.getByRole("main-content");
            const valueProposition =
                within(mainContent).getByRole("value-proposition");
            const heading = within(valueProposition).getByRole("heading", {
                level: 1,
            });
            const subheading = within(valueProposition).getByRole("heading", {
                level: 2,
            });
            expect(heading).toBeInTheDocument();
            expect(subheading).toBeInTheDocument();
        });

        it("renders a call to action button in the value proposition", () => {
            render(<Landing />);
            const mainContent = screen.getByRole("main-content");
            const callToActionButton =
                within(mainContent).getByRole("call-to-action");
            expect(callToActionButton).toBeInTheDocument();
        });

        it("renders an image showing the Synthesize insights page in action", () => {
            render(<Landing />);
            const mainContent = screen.getByRole("main-content");
            const image = within(mainContent).getByAltText(
                /example of synthesize in action/i
            );
            expect(image).toBeInTheDocument();
        });

        it("renders a user testimonial of using Synthesize", () => {
            render(<Landing />);
            const mainContent = screen.getByRole("main-content");
            const testimonialText =
                within(mainContent).getByRole("testimonial-text");
            expect(testimonialText).toBeInTheDocument();
            const testimonialAuthor =
                within(mainContent).getByRole("testimonial-author");
            expect(testimonialAuthor).toBeInTheDocument();
        });
    });

    describe("Interactivity", () => {
        it("redirects to the login page when the login button is clicked", async () => {
            render(<Landing />);
            const navigationbar = screen.getByRole("navigation-bar");
            const loginButton = within(navigationbar).getByRole("login");
            expect(loginButton).toHaveAttribute("href", "/auth/login");
        });

        it("redirects to the signup page when the call to action button is clicked", async () => {
            render(<Landing />);
            const mainContent = screen.getByRole("main-content");
            const callToActionButton =
                within(mainContent).getByRole("call-to-action");
            expect(callToActionButton).toHaveAttribute("href", "/auth/signup");
        });
    });
});
