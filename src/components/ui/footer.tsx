import React from "react";

export default function Footer() {
  return (
    <div className="px-1 py-4 mt-auto flex justify-between text-[10px]   sm:text-[14px] text-slate-600/80">
      <p> 2024 Eventify , All rights reserved </p>
      <div className="flex justify-between gap-x-5">
        <h1>Terms & Conditions</h1>
        <h1>Privacy Policy</h1>
      </div>
    </div>
  );
}
