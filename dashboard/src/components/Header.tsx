import { AlignCenter, LogOut, Map, User } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (dispatch) {
      dispatch({
        type: "LOGOUT",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    navigate("/login");
  };

  return (
    <header className="bg-transparent">
      <div className="py-2 flex items-center justify-between z-50 lg:py-[12.5px]">
        <Logo />
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
              <DropdownMenuLabel className="text-blue-lagoon-900 uppercase font-bold text-sm dark:text-white">
                Listas
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="relative flex items-center gap-2 cursor-pointer p-0">
                <Map className="absolute left-2 h-4 w-4" />
                <Link
                  to="/trips"
                  className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
                >
                  Viajes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-0">
                <User className="absolute left-2 h-4 w-4" />
                <Link
                  to="/users"
                  className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
                >
                  Usuarios
                </Link>
              </DropdownMenuItem>
              <DropdownMenuLabel className="text-blue-lagoon-900 uppercase font-bold text-sm dark:text-white">
                Admin
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer p-0">
                <User className="absolute left-2 h-4 w-4" />
                <Link
                  to="/mi-perfil"
                  className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
                >
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-0">
                <LogOut className="absolute left-2 h-4 w-4" />

                <Link
                  to="/login"
                  onClick={handleLogOut}
                  className="rounded-lg py-1.5 px-2 pl-7 z-20 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
                >
                  Salir
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
