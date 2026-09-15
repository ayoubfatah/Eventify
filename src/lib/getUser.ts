import { getTokenFromCookies } from "@/lib/cookies";

export async function getUserFromToken(token: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/users/me`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
      cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}: ${text}`);
    }
    const data = JSON.parse(text);

    return data;
  } catch (error) {
    console.error("9 - getUserFromToken ERROR:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  const token = await getTokenFromCookies();
  if (!token) {
    return null;
  }
  try {
    const currentUser = await getUserFromToken(token);
    return currentUser;
  } catch {
    return null;
  }
}
