"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";
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
    
    // useEffect(() => {
    //   // Load navbar state from local storage
    //   const savedState = localStorage.getItem("isNavbarOpen");
    //   if (savedState !== null) {
    //     setIsNavbarOpen(JSON.parse(savedState));
    //   }
    // }, []);

    return (
      // bg-gradient-to-b from-sky-200 Via: via-rose-100 To: to-pink-200
    <div className="bg-gradient-to-b from-sky-200 via-rose-100 to-pink-200 flex flex-row">
      <NavigationBar
        user={email}
        isNavbarOpen={isNavbarOpen}
        toggleNavbarOpen={toggleNavbarOpen}
      />
      <div className={`flex-auto mb-20 mr-8 ${isNavbarOpen ? 'ml-64' : 'ml-8'}`}>
        {children}
      </div>
    </div>
  );
}
