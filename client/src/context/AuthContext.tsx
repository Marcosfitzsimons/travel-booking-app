import { createContext, Dispatch, useEffect, useReducer } from "react";

type User = {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  phone: number;
  image?: string;
  addressCda: string;
  addressCapital: string;
  dni: number;
  password: string;
  myTrips: [];
};
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  dispatch?: Dispatch<AuthAction>;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" };

const userFromLocalStorage = localStorage.getItem("user");
const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

const INITIAL_STATE = {
  user: user,
  loading: false,
  error: null,
};

export const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

const AuthReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
