import "@/app/globals.css";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-rose-100 to-pink-200 px-20 pt-4">
        {children}
    </div>
  );
}
