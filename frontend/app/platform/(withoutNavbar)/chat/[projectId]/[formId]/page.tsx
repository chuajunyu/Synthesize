"use client";
import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "@/components/ChatBubble";
import { useAuth } from "@/lib/firebase/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import create_chat_history from "@/database/create_chat_history";

export interface MessageProps {
  timestamp: number;
  message: string;
  role: "user" | "robot";
}

interface SendButtonProps {
  handleSubmit: () => void;
}

function SendButton({ handleSubmit }: SendButtonProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6 mx-2 cursor-pointer"
      onClick={handleSubmit}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      />
    </svg>
  );
}

export default function ChatBot({
  params,
}: {
  params: { projectId: string; formId: string };
}) {
  const project = params.projectId;
  const form = params.formId;
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    let mounted = true;

    async function authenticate() {
      const email = user?.email ?? "";
      if (mounted) {
        setUserEmail(email);
      }
    }

    authenticate();

    return () => {
      mounted = false;
    };
  }, [user?.email]);

  const handleInputChange = (e: string) => {
    setInput(e);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") {
      return;
    }
    const newMessage: MessageProps = {
      timestamp: Date.now(),
      message: input,
      role: "user",
    };
    setMessages((prevMessages) => {
      const newHistory = [...prevMessages, newMessage];
      return newHistory;
    });
    setInput("");

    try {
      const response = await fetch(
        `https://synthesize-wcnj.onrender.com/chat/${project}/${form}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userEmail,
            form_id: form,
            project_id: project,
            message: input,
          }),
        }
      );

      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();

      const botMessage: MessageProps = {
        timestamp: Date.now(),
        message: data.response,
        role: "robot",
      };
      setMessages((prevMessages) => {
        const newHistory = [...prevMessages, botMessage];
        return newHistory;
      });

      if (data.response.includes("<END>")) {
        storeMessageHistory();
      }
    } catch (error) {
      console.log("Fetch error", error);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function getBotOpening() {
      if (mounted) {
        try {
          const response = await fetch(
            `https://synthesize-wcnj.onrender.com/chat/${project}/${form}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: userEmail,
                form_id: form,
                project_id: project,
                message: "",
              }),
            }
          );

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return;
          }

          const data = await response.json();

          const botMessage: MessageProps = {
            timestamp: Date.now(),
            message: data.response,
            role: "robot",
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
          console.log("Fetch error", error);
        }
      }
    }

    getBotOpening();

    return () => {
      mounted = false;
    };
  }, [project, form, user?.email]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents newline being added in the textarea
      handleSendMessage();
    }
  };

  const storeMessageHistory = async () => {
    create_chat_history(userEmail, form, messages);
    setTimeout(() => {
      alert("The conversation has ended. You may close the tab now.");
    }, 1000); // Delay of 1 second (1000 milliseconds)
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col max-h-lvh h-[calc(100vh-2rem)] bg-stone-100 w-full rounded-lg">
        <div className="flex flex-row bg-rose-100 w-full rounded-tr-lg rounded-tl-lg text-stone-500 font-semibold text-xl pl-4 py-2 mb-2">
          Synthesize Chatbot
        </div>
        <div className="flex flex-grow flex-col overflow-y-auto bg-stone-100 w-full rounded-lg">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message.message}
              role={message.role}
              timestamp={message.timestamp}
            />
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <div className="flex flex-row items-center bg-white rounded-br-lg rounded-bl-lg">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a Message..."
            className="flex-grow p-2 focus:outline-none focus:bg-white transition-colors duration-200 rounded-bl-lg resize-none"
            rows={1}
            style={{ overflow: "hidden" }}
          />
          <SendButton handleSubmit={handleSendMessage} />
        </div>
      </div>
    </ProtectedRoute>
  );
}