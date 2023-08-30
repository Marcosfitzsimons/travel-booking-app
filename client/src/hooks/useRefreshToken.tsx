import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  // we call this function when our initial request fails
  // when our access token is expired
  const refresh = async () => {
    const response = await axios.get("auth/refresh", {
      withCredentials: true,
    });
    console.log("useRefreshTOKEN");
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.token);
      return { ...prev, token: response.data.token };
    });
    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
