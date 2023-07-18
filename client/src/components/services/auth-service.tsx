import axios from "axios";

const verifyUser = (code: any) => {
  return axios
    .get(
      "https://fabebus-api-example.onrender.com/api/auth/" + "confirm/" + code
    )
    .then((response) => {
      return response.data;
    });
};

export default {
  verifyUser,
};
