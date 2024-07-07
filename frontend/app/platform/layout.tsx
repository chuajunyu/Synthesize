"use client";
import "@/app/globals.css";
import React, { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import { useAuth } from "@/lib/firebase/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
    const email = user?.email ?? "";
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);

    const toggleNavbarOpen = () => {
      setIsNavbarOpen(!isNavbarOpen);
    };

    return (
      <div className="bg-gradient-to-b from-sky-200 via-rose-100 to-pink-200 flex flex-row">
        <NavigationBar
          user={email}
          isNavbarOpen={isNavbarOpen}
          toggleNavbarOpen={toggleNavbarOpen}
        />
        <div
          className={`flex-auto mb-20 mr-4 ${isNavbarOpen ? "ml-60" : "ml-4"}`}
        >
          {children}
        </div>
      </div>
    );
}
