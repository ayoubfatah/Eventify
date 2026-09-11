"use server";

import { cookies } from "next/headers";

export async function getTokenFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return token;
}

export async function setTokenToCookies(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}
