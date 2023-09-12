import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios('auth/logout', {
                withCredentials: true
        });
        setAuth({ user: null });
        navigate("/login");
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout