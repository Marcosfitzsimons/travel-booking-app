import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
export interface AuthContextType {
  auth: AuthObject;
  setAuth: Dispatch<SetStateAction<AuthObject>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
}

type UserData = {
  _id: string | undefined;
  status: string | undefined;
  image?: string | undefined;
};

interface AuthObject {
  user: UserData | null;
  token?: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthObject: AuthObject = {
  user: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthObject>(defaultAuthObject);

  const persistedValue = localStorage.getItem("persist");
  const initialPersist = persistedValue ? persistedValue === "true" : false;

  const [persist, setPersist] = useState<boolean>(initialPersist);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
