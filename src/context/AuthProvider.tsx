import { setTokenToCookies } from "@/lib/cookies";
import { login } from "@/lib/server-auth-utils";
import {
  Children,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

type UserData =
  | {
      firstName: string;
      secondName: string;
      userName: string;
      email: string;
      password: string;
    }
  | undefined;

const AuthContext = createContext<{
  user: UserData;
  isLoading: boolean;
  error: string;
  loginUser: (data: LoginData) => Promise<void>;
} | null>(null);

type LoginData = {
  email: string;
  password: string;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  // sing up
  //  we need email and the details
  // then we need a api function  hits the rest api
  // thats it ofr sign up

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<UserData>();

  async function loginUser(data: LoginData) {
    try {
      setIsLoading(true);
      const { user, token } = await login(data);
      setUser(user);
      await setTokenToCookies(token);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

 async function logOut(){
    
 }
  return (
    <AuthContext.Provider value={{ user, isLoading, error, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Can't access auth context data outside its provider");
  }
  return context;
}
