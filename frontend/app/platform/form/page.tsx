"use client"
import React, { useEffect, useState } from 'react';
import { CreatedFormsTable } from "@/components/CreatedFormsTable";
import { getUserForms } from '@/database/read_user_forms';
import { useAuth } from "@/lib/firebase/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

const chooseTypeOfForm = () => {

    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const { user } = useAuth();

    console.log(user)
    
    useEffect(() => {
        async function authenticate() {
            const email = user?.email ?? "";
            setUserEmail(email);
            setLoading(false);
        }
        authenticate();
    }, [user?.email]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const name = user?.displayName;

    return (
        <ProtectedRoute>
            <div className="flex mx-8 mt-5">
                <div className="flex flex-col w-full">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        Creating a form, {name}? Choose between creating one yourself or getting AI to do it for you based on your goals!
                    </span>
                    <div className="flex flex-row w-full space-x-6">
                        <Card className="sm:col-span-2 w-1/2">
                        <CardHeader className="pb-3">
                            <CardTitle>Create a Form Myself 👨‍💻</CardTitle>
                            <CardDescription className="w-full">
                            Define your form's title, description, and provide form questions. Note that all form questions are open-ended for you to gain the deepest insights out of Synthesise. 
                            Delete and add questions at your full convenience! 💪
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Link href="form/manualForm">
                                <Button>
                                    Let's get started!
                                </Button>
                            </Link>
                        </CardFooter>
                        </Card>
                        <Card className="sm:col-span-2 w-1/2">
                        <CardHeader className="pb-3">
                            <CardTitle>Generate Forms with the Empowerment of AI 🤖</CardTitle>
                            <CardDescription className="w-full">
                            Introducing our AI-powered form-builder powered by OpenAI's ChatGPT-4o. Simply provide your business context and goals, and get ready to unveil deep and thorough insights beyond the traditional means of any form! 🎉
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                                <Link href="form/aiForm">
                                    <Button>
                                    Try it out!
                                    </Button>
                                </Link>
                        </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default chooseTypeOfForm