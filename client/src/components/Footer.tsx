import { Facebook, Instagram, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="w-[min(90%,1200px)] mx-auto py-3 flex justify-between items-center">
        <Logo />
        <div className="">
          <p className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            2273856102
          </p>
          <p className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            2273856382
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Instagram className="cursor-pointer dark:hover:text-white" />
          <Separator orientation="vertical" className="h-8" />
          <Facebook className="cursor-pointer dark:hover:text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
