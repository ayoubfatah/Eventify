"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { login } from "@/lib/server-auth-utils";
import { removeTokenFromCookies, setTokenToCookies } from "@/lib/cookies";
import { getCurrentUser } from "@/lib/getUser";

type UserData = {
  id: number;
  firstName: string;
  secondName: string;
  userName: string;
  email: string;
} | null;

type LoginData = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: UserData;
  isLoading: boolean;
  error: string;
  loginUser: (data: LoginData) => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * Login
   */
  const loginUser = useCallback(async (data: LoginData) => {
    try {
      setIsLoading(true);
      setError("");

      // 1. Login and get JWT
      const { token } = await login(data);

      // 2. Save JWT in cookies
      await setTokenToCookies(token);

      // 3. Get the newly authenticated user
      const currentUser = await getCurrentUser();

      // 4. Store user in React state
      setUser(currentUser);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }

      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /*
   * Restore user when the app starts
   * or when the page is refreshed.
   */
  useEffect(() => {
    async function restoreUser() {
      try {
        setIsLoading(true);

        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    restoreUser();
  }, []);

  /*
   * Logout
   */
  const logOut = useCallback(async () => {
    try {
      setIsLoading(true);

      await removeTokenFromCookies();

      setUser(null);
      setError("");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
 * Auth hook
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Can't access auth context outside its provider");
  }

  return context;
}
