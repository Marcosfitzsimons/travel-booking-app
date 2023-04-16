import { Link } from "react-router-dom";
import logo from "../assets/fabebus-logo.jpg";

const Logo = () => {
  return (
    <Link to="/" className="relative w-12 aspect-square lg:w-14">
      <img
        src={logo}
        className="rounded-full object-cover w-12 aspect-square lg:w-14"
        alt="fabebus logo"
      />
    </Link>
  );
};

export default Logo;
