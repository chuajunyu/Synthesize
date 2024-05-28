"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
} from "@/lib/firebase/auth_email_password";

function handleSubmitSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    console.log(password);
    if (email && password) {
        signUpWithEmailAndPassword(email, password);
    }
}

function handleSubmitLogIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    console.log(password);
    if (email && password) {
        logInWithEmailAndPassword(email, password);
    }
}

function EmailSignUp() {
    return (
        <form onSubmit={handleSubmitSignUp}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="meow@example.com"
                        name="email"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </div>
        </form>
    );
}

function EmailLogIn() {
    return (
        <form onSubmit={handleSubmitLogIn}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="meow@example.com"
                        name="email"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </div>
        </form>
    );
}

export { EmailSignUp, EmailLogIn };
