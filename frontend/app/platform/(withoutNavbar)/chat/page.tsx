import React from 'react'
import ChatBubble from '@/components/ChatBubble';

export default function () {
    return (
      <div className="flex flex-col bg-stone-100 w-full rounded-lg">
        <div className="flex flex-row bg-rose-100 w-full rounded-tr-lg rounded-tl-lg text-stone-500 font-semibold text-xl pl-4 py-2 mb-2">
          Synthesize Chatbot
        </div>
        <div className="bg-stone-100 bg-scroll w-full rounded-lg">
          <ChatBubble message="hello" role='robot' />
          <ChatBubble message="hello" role='user' />
        </div>
      </div>
    );
}