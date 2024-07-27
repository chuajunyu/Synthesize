import React, { useState, useEffect } from "react"

interface ChatBubbleProps {
  message: string;
  role: "user" | "robot";
  timestamp: number;
}

export default function ChatBubble({ message, role, timestamp }: ChatBubbleProps) {
    const formatTime = new Date(timestamp).toLocaleTimeString("zh-SG");
    const time = formatTime.slice(2)
    const isUser = role == 'user';

    return (
      <div>
        <div
          className={`flex flex-row items-center my-4 mx-6 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          {!isUser && (
            <div className="flex items-center justify-center border-slate-600 rounded-full bg-sky-200 text-white mr-4 w-10 h-10 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 fill-slate-500 text-slate-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          )}
            <div className={`max-w-md ${isUser ? 'bg-purple-500' : 'bg-slate-500'} flex-col flex text-white px-4 py-2 rounded-lg shadow-md text-sm`}>
                <span className="flex-grow w-full break-words">{message}</span>
                {isUser && (
                <div className="flex flex-row items-center text-xs justify-end mt-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`size-4 mr-2 items-center justify-center text-teal-200`}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                    />
                    </svg>
                    <span>{time}</span>
              </div>
                )}
            </div>
        </div>
      </div>
    );
}