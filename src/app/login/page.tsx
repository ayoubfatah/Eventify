"use client";
import H1 from "@/components/ui/h1";
import { useAuth } from "@/context/AuthProvider";
import { login } from "@/lib/server-auth-utils";
import { FormEvent, useState } from "react";
export default function Page() {
  const [email, setEmail] = useState("sss@gmail.com");
  const [password, setPassword] = useState("12345678");

  const { isLoading, error, loginUser } = useAuth();

  //
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await loginUser({ password, email });
  }

  return (
    <div className="mt-12">
      {" "}
      <H1 className="mb-8">Login to Eventify</H1>{" "}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {" "}
        <div className="space-y-2">
          {" "}
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-white/80 uppercase tracking-wide"
          >
            {" "}
            Email{" "}
          </label>{" "}
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sss@gmail.com"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />{" "}
        </div>{" "}
        <div className="space-y-2">
          {" "}
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-white/80 uppercase tracking-wide"
          >
            {" "}
            Password{" "}
          </label>{" "}
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />{" "}
        </div>{" "}
        {error && <p className="text-red-400 text-sm">{error}</p>}{" "}
        <button
          type="submit"
          disabled={isLoading}
          className="ml-auto mt-8 px-6 py-3 bg-primary rounded-lg text-black font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {" "}
          {isLoading ? "Login..." : "Login"}{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
}
