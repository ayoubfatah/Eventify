import { getTokenFromCookies } from "@/lib/cookies";

const API_URL = "http://localhost:8080";

export async function getUserFromToken(token: string) {
  console.log("1 - TOKEN:", token);
  console.log("2 - API URL:", API_URL);
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
      cache: "no-store",
    });
    console.log("3 - STATUS:", response.status);
    console.log("4 - STATUS TEXT:", response.statusText);
    console.log("5 - CONTENT TYPE:", response.headers.get("content-type"));
    const text = await response.text();
    console.log("6 - RAW RESPONSE:");
    console.log(text);
    console.log("7 - RAW RESPONSE LENGTH:", text.length);
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}: ${text}`);
    }
    const data = JSON.parse(text);
    console.log("8 - PARSED DATA:", data);
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
