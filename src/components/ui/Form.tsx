"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Form() {
  const router = useRouter();
  const [city, setCity] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/events/${city}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 " action="">
      <input
        className=" py-2 px-3 w-[400px] h-14 bg-white/[4%]  text-center   ring-[1px] ring-primary outline-none rounded-full"
        type="text"
        name="city"
        placeholder="Search events in any city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </form>
  );
}
