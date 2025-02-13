"use client";

import React from "react";
import BeautifulAuthForm from "@/components/auth/BeautifulAuthForm";
import Link from "next/link";

export default function LoginPage() {
  const handleSubmit = async (values: { username: string; password: string }) => {
    console.log("Login values:", values);
    // Handle login via API or other logic here.
  };

  return (
    <div>
      <BeautifulAuthForm type="login" onSubmit={handleSubmit} />
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link href="/(auth)/register" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}