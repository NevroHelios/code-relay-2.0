"use client";

import React from "react";
import SignupForm from "@/components/auth/SignupForm";

export default function RegisterPage() {
  const handleSubmit = async (values: {
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
  }) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful", data);
        // Optionally, redirect or update UI
      } else {
        console.error("Registration error", data.error);
      }
    } catch (error) {
      console.error("Registration exception", error);
    }
  };

  return <SignupForm onSubmit={handleSubmit} />;
}