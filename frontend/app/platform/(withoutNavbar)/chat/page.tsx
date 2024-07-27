"use client"
import React, { useState, useEffect, useRef } from 'react'
import ChatBubble from '@/components/ChatBubble';

interface MessageProps {
  timestamp: number;
  message: string;
  role: "user" | "robot";
}

interface SendButtonProps {
    handleSubmit: () => void
}

export function SendButton({ handleSubmit }: SendButtonProps) {
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

export default function () {

    const initialMessages: MessageProps[] = [
      {
        timestamp: 1717161807200,
        message: "Hello! How can I help you today?",
        role: "robot",
      },
      {
        timestamp: 1717161807200,
        message: "Hi! I need some information about your services.",
        role: "user",
      },
      {
        timestamp: 1717161807200,
        message:
          "Sure, I can help with that. What specifically would you like to know?",
        role: "robot",
      },
      {
        timestamp: 1717161807200,
        message: "Can you tell me more about your pricing?",
        role: "user",
      },
      {
        timestamp: 1717161807200,
        message:
          "Our pricing depends on the service package you choose. We offer several tiers to fit different needs and budgets.",
        role: "robot",
      },
    ];

    const [messages, setMessages] = useState<MessageProps[]>(initialMessages);
    const [input, setInput] = useState<string>("");
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInputChange = (e: string) => {
        setInput(e);
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }
    const handleSendMessage = () => {
        if (input.trim() === '') {
            return;
        } 

        console.log(input);
        const newMessage: MessageProps = {
            timestamp: Date.now(),
            message: input,
            role: 'user',
        }

        setMessages([...messages, newMessage]);
        console.log("Send Message Button Clicked");
        setInput("");
    }

    useEffect(() => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

    return (
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
            placeholder="Type a Message..."
            className="flex-grow p-2 focus:outline-none focus:bg-white transition-colors duration-200 rounded-bl-lg resize-none"
            rows={1}
            style={{ overflow: "hidden" }}
          />
          <SendButton handleSubmit={handleSendMessage} />
        </div>
      </div>
    );
}