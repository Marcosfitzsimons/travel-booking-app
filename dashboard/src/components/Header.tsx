import { AlignCenter } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-[#fafafa] dark:bg-[#0d0f12]">
      <div className="py-2 flex items-center justify-between z-50 lg:py-[12.5px]">
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-1">
          <div className="relative top-[1px]">
            <ThemeToggle />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="lg:hidden" asChild>
              <Button
                variant="ghost"
                className="relative top-[1px] w-8 h-8 rounded-md p-0 dark:hover:text-white dark:hover:bg-blue-lagoon-900/70"
              >
                <AlignCenter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer p-0">
                <Link
                  to="/trips"
                  className="rounded-lg py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
                >
                  Viajes
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer p-0">
                <Link
                  to="/users"
                  className="rounded-lg py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
                >
                  Usuarios
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
