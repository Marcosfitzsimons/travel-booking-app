import { useContext, useDebugValue } from "react";
import AuthContext, { AuthContextType } from "../context/AuthContext"; // Import AuthContextType

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    useDebugValue(context.auth, auth => (auth?.user ? "Logged In" : "Logged Out"));

    return context; // Return the entire context object
};

export default useAuth;