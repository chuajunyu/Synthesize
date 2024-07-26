import React from "react"

interface ChatBubbleProps {
    message: string;
    role: 'user' | 'robot';
}

export default function ChatBubble({ message, role }: ChatBubbleProps) {
    const isUser = role == 'user';
    return (
      <div>
        <div className="flex flex-row items-center my-2 mx-4 `${showIcon? justify-start: justify-end}`">
                {!isUser && (
                    <div className="flex items-center justify-center border-slate-600 rounded-full bg-sky-100 text-white mr-4 w-10 h-10 justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6 text-black"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                        </svg>
                    </div>
                )}
            <div className="relative max-w-md bg-purple-300 text-white px-4 py-2 rounded-lg shadow-md text-sm">
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-300 border-gray-200 rotate-45">
                </div>
                {message}
            </div>
          </div>
      </div>
    );
}