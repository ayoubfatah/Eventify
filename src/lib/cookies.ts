"use server";

import { cookies } from "next/headers";

export async function setTokenToCookies(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function getTokenFromCookies(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get("token")?.value;
}

export async function removeTokenFromCookies() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
}
