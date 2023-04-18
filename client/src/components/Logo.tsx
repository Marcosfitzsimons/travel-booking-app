import { Link } from "react-router-dom";
import logo from "../assets/fabebus-logo.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Logo = () => {
  return (
    <Link
      to="/"
      className="rounded-full relative after:absolute after:-inset-[3px] after:rounded-full after:border after:shadow-inner after:shadow-white  after:border-gray-100 dark:after:shadow-none"
    >
      <Avatar className="">
        <AvatarImage
          src={logo}
          alt="fabebus logo"
          className="object-cover z-40"
        />
        <AvatarFallback>Logo</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default Logo;
