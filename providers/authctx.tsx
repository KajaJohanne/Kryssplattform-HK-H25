//context
//lage egen hook

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

//lage ny type
type AuthContextType = {
  signIn: (userName: string) => void;
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
  const [isLoadning, setIsLoading] = useState(true);

  useEffect(() => {
    //sjekker om noen er logget inn, fra async storage
    AsyncStorage.getItem("authSession").then((value) => {
      setUserSession(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext
      value={{
        signIn: (userName: string) => {
          setUserSession(userName);
          AsyncStorage.setItem("authSession", userName);
        },
        signOut: () => {
          setUserSession(null);
          AsyncStorage.removeItem("authSession");
        },
        userNameSession: userSession,
        isLoading: isLoadning,
      }}
    >
      {children}
    </AuthContext>
  );
}
