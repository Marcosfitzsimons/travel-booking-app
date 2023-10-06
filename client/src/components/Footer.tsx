import { Facebook, Instagram, Phone } from "lucide-react";
import { Separator } from "./ui/separator";
import useAuth from "@/hooks/useAuth";
import WhatsappButton from "./WhatsappButton";

const Footer = () => {
  const { auth } = useAuth();
  const user = auth?.user;
  return (
    <footer className={!user ? "hidden" : ""}>
      <div className="w-[min(95%,1200px)] mx-auto my-12 flex justify-center items-center">
        <div className="hidden">
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
          <a href="https://www.instagram.com/fabebus/" target="_blank">
            <Instagram className="cursor-pointer w-5 h-5 hover:text-blue-lagoon-600 dark:hover:text-white" />
          </a>
          <Separator orientation="vertical" className="h-2" />
          <WhatsappButton />
          <Separator orientation="vertical" className="h-2" />
          <a
            href="https://www.facebook.com/p/Fabe-Bus-Carmen-de-Areco-100028549916742"
            target="_blank"
          >
            <Facebook className="cursor-pointer w-5 h-5 hover:text-blue-lagoon-600 dark:hover:text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
