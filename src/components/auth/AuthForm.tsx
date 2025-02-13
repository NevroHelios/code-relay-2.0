"use client";

import React from "react";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (values: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  return (
    <div>
      <h2>{type === "login" ? "Login" : "Register"}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // For demo purposes, pass dummy values
          onSubmit({
            email: "test@example.com",
            password: "password",
            ...(type === "register" && { name: "Your Name" }),
          });
        }}
      >
        <button type="submit">{type === "login" ? "Login" : "Register"}</button>
      </form>
    </div>
  );
};

export default AuthForm;