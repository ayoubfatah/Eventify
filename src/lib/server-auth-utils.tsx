export type UserData = {
  firstName: string;
  secondName: string;
  userName: string;
  email: string;
  password: string;
};



export async function signUp(data: UserData) {
  const response = await fetch(`${process.env.API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function login(data: { email: string; password: string }) {
  const response = await fetch(`${process.env.API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
