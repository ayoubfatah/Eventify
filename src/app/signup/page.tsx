"use client";

import H1 from "@/components/ui/h1";
import { signUp, UserData } from "@/lib/server-auth-utils";
import React, { FormEvent, useState } from "react";

const formFields = [
  {
    label: "First name",
    name: "firstName",
    placeHolder: "John",
    defaultValue: "Said",
    type: "text",
  },
  {
    label: "Second name",
    name: "secondName",
    placeHolder: "Doe",
    defaultValue: "Fatah",
    type: "text",
  },
  {
    label: "Username",
    name: "userName",
    placeHolder: "ssaid123",
    defaultValue: "ssaid123",
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    placeHolder: "sss@gmail.com",
    defaultValue: "sss@gmail.com",
    type: "email",
  },
  {
    label: "Password",
    name: "password",
    placeHolder: "********",
    defaultValue: "12345678",
    type: "password",
  },
];

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as UserData;
    try {
      await signUp(data);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setIsSubmitting(false);
      }
    }
  }

  if (isSuccess) {
    return (
      <div className="mt-12 text-center">
        <H1 className="mb-4">Sign Up Completed 🎉</H1>

        <p className="text-white/70 mb-6">
          Your account has been created successfully.
        </p>

        <a
          href="/login"
          className="inline-block px-6 py-3 bg-primary rounded-lg text-black font-bold hover:bg-primary/90 transition"
        >
          Please Login
        </a>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <H1 className="mb-8">Sign Up to Eventify</H1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {formFields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className="block text-sm font-semibold text-white/80 uppercase tracking-wide"
            >
              {field.label}
            </label>

            <input
              id={field.name}
              type={field.type}
              name={field.name}
              defaultValue={field.defaultValue}
              placeholder={field.placeHolder}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
        ))}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-auto mt-8 px-6 py-3 bg-primary rounded-lg text-black font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
