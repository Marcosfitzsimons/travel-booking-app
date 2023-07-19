import AuthService from "../components/services/auth-service";
import { Link, useParams } from "react-router-dom";

const Welcome = () => {
  const { confirmationCode } = useParams();

  if (confirmationCode) {
    AuthService.verifyUser(confirmationCode);
  }
  return (
    <div className="">
      <div className="">
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </div>
      <Link to="/login">Entra a tu cuenta</Link>
    </div>
  );
};

export default Welcome;
