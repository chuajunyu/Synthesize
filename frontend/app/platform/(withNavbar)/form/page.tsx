"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Block1 from "@/components/Block1";

const chooseTypeOfForm = () => {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { user } = useAuth();

  console.log(user);

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
            Creating a form, {name}? Choose between the two options below:
          </span>
          <div className="flex flex-row w-full space-x-6">
            <Block1
              title="Create a Form Myself"
              text="Define your form's title, description, and provide form
                  questions. Note that all form questions are open-ended for you
                  to gain the deepest insights out of Synthesise. Delete and add
                  questions at your full convenience! 💪"
              showButton={true}
              buttonText="Create a Manual Form"
              href="form/manualForm"
            />
            <Block1
              title="Generate Forms with the Empowerment of AI 🤖"
              text="Introducing our AI-powered form-builder powered by OpenAI's
                  ChatGPT-4o. Simply provide your business context and goals,
                  and get ready to unveil deep and thorough insights beyond the
                  traditional means of any form! 🎉"
              showButton={true}
              buttonText="Try it out!"
              href="form/aiForm"
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default chooseTypeOfForm;
