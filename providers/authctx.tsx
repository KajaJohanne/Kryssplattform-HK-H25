//context
//lage egen hook

import { signIn, signOut } from "@/api/authApi";
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

//lage ny type
type AuthContextType = {
  signIn: (userEmail: string, password: string) => void;
  signOut: VoidFunction;
  userNameSession?: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//funksjon som får returnert authcontexttype
export function useAuthSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error(
      "UseAuthSession must be used within an AuthContext Provider"
    );
  }

  //hvis vi er i contexten
  return value;
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [userSession, setUserSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        setUserSession(user.email);
      } else {
        setUserSession(null);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <AuthContext
      value={{
        signIn: (userEmail: string, password: string) => {
          signIn(userEmail, password);
        },
        signOut: () => {
          signOut();
        },
        userNameSession: userSession,
        isLoading: isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
