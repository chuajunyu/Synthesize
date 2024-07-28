import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '@/components/auth/Login'; // Adjust the import path as needed

// Mock the dependencies
jest.mock('@/components/auth/EmailLogIn', () => {
  return jest.fn(() => <div>EmailLogIn Component</div>);
});
jest.mock('@/components/authFunctions', () => ({
  SignInGoogle: jest.fn(() => <div>SignInGoogle Component</div>),
}));
jest.mock('next/link', () => ({
  __esModule: true,
default: ({ children, href }: { children: React.ReactNode, href: string }) => <a href={href}>{children}</a>,
}));

describe('Login Page Component', () => {
  it('renders login page correctly', () => {
    render(<Login />);

    // Check if the main heading is present
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Check for the subheading
    expect(screen.getByText('Select one of the following log-in methods')).toBeInTheDocument();

    // Check for the EmailLogIn component
    expect(screen.getByText('EmailLogIn Component')).toBeInTheDocument();

    // Check for the SignInGoogle component
    expect(screen.getByText('SignInGoogle Component')).toBeInTheDocument();

    // Check for the sign-up link
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  it('renders the sign-up link with the correct href', () => {
    render(<Login />);

    // Check the href of the sign-up link
    const signUpLink = screen.getByText('Sign up');
    expect(signUpLink.closest('a')).toHaveAttribute('href', 'signup');
  });
});
