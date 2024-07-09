"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpWithEmailAndPassword } from "@/lib/firebase/auth_email_password";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmailSignUp() {
    const router = useRouter();
    const [errorCode, setErrorCode] = useState<string | null>(null);

    async function handleSubmitSignUp(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const email = form.get("email")?.toString();
        const password = form.get("password")?.toString();
        if (email && password) {
            try {
                const message = await signUpWithEmailAndPassword(
                    email,
                    password
                );
                if (message == "success") {
                    router.push("/platform/form");
                } else {
                    setErrorCode(message);
                }
            } catch (error) {
                console.log(error);
                setErrorCode("A server error occurred. Please try again.");
            }
        }
    }

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
                <div className="text-red-500">{errorCode}</div>
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </div>
        </form>
    );
}
