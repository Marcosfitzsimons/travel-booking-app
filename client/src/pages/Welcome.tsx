import AuthService from "../components/services/auth-service";
import { Link } from "react-router-dom";

const Welcome = (props: any) => {
  if (props.match.path === "/confirm/:confirmationCode") {
    AuthService.verifyUser(props.match.params.confirmationCode);
  }

  return (
    <div className="">
      <div className="">
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </div>
      <Link to="/viajes">Nuestros viajes</Link>
    </div>
  );
};

export default Welcome;
