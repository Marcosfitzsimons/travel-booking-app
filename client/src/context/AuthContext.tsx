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
}

type UserData = {
  _id: string;
  status: string;
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

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
