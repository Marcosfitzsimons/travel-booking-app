import axios from "axios";

const verifyUser = (code: any) => {
  return axios
    .get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_ENDPOINT}/auth/confirm/${code}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // Handle the error here
      console.error("Error occurred during API call:", error.response.data.msg);
      throw error; // Rethrow the error if needed or return a default value
    });
};

export default {
  verifyUser,
};
