import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ClipboardList,
  LogOut,
  User,
  UserCog,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Separator } from "./ui/separator";
import Logo from "./Logo";

type HeaderProps = {
  setIsUserInfo: (value: boolean) => void;
};
// Add arrow to avatar dropdown menu :)
const Header = ({ setIsUserInfo }: HeaderProps) => {
  const { user, dispatch } = useContext(AuthContext);

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
    <header className="fixed w-full z-50 bg-[#fafafa] dark:bg-[#0E1217] border-b border-b-border-color dark:border-b-border-color-dark">
      <div className="w-[min(95%,1200px)] mx-auto py-3 flex justify-between items-center">
        <div className="flex items-center flex-row-reverse gap-2">
          {user ? (
            <Link
              to="/viajes"
              onClick={() => setIsUserInfo(false)}
              className="rounded-md px-2 font-medium flex items-center gap-1 w-full text-start bg-transparent hover:text-blue-lagoon-900 dark:hover:text-white lg:hidden"
            >
              Viajes
            </Link>
          ) : (
            ""
          )}
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <nav className="hidden lg:flex">
            <ul className="flex items-center">
              <li>
                <Link
                  to="/viajes"
                  className="font-medium rounded-md py-1 px-3 hover:text-blue-lagoon-900 dark:hover:text-white"
                >
                  Viajes
                </Link>
              </li>
              <li>
                <Link
                  to="/nosotros"
                  className="font-medium rounded-md py-1 px-3 hover:text-blue-lagoon-900 dark:hover:text-white"
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </nav>
          <Separator orientation="vertical" className="hidden h-6 lg:flex" />
          <ThemeToggle />
          <Separator orientation="vertical" className="h-6" />
          {!user ? (
            <div className="flex items-center gap-1">
              <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-white/20 focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 after:transition">
                <Button className="h-[29px] p-0 relative bg-black text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/20 dark:text-slate-100 dark:hover:text-white dark:bg-black/60 ">
                  <Link to="/login" className="py-2 px-4">
                    Entrar
                  </Link>
                </Button>
              </div>
              <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 after:transition">
                <Button className="h-7 p-0 relative bg-[#9e4a4f] text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#9e4a4f]">
                  <Link to="/register" className="py-2 px-4">
                    Registrarme
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 ">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.image} alt="avatar picture" />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border-border-color dark:border-zinc-600"
                >
                  <DropdownMenuLabel className="text-black/80 font-bold text-sm dark:text-white">
                    Mi Cuenta
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="dark:bg-zinc-600" />
                  <DropdownMenuItem className="relative flex items-center gap-2 cursor-pointer p-0 hover:text-blue-lagoon-700 ">
                    <User className="absolute left-2 h-4 w-4 text-icon-color dark:text-icon-color-dark" />
                    <Link
                      to="/mi-perfil"
                      className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent text-blue-lagoon-900 hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-50 dark:hover:text-white dark:hover:bg-zinc-700/20"
                      onClick={() => setIsUserInfo(true)}
                    >
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="relative flex items-center gap-2 cursor-pointer p-0 hover:text-blue-lagoon-700">
                    <ClipboardList className="absolute left-2 h-4 w-4 text-icon-color dark:text-icon-color-dark" />
                    <Link
                      to="/mi-perfil"
                      onClick={() => setIsUserInfo(false)}
                      className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent text-blue-lagoon-900 hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-50 dark:hover:text-white dark:hover:bg-zinc-700/20"
                    >
                      Mis viajes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="relative flex items-center gap-2 cursor-pointer p-0 hover:text-blue-lagoon-700">
                    <UserCog className="absolute left-2 h-4 w-4 text-icon-color dark:text-icon-color-dark" />
                    <Link
                      to="/mi-perfil/editar-perfil"
                      className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent text-blue-lagoon-900 hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-50 dark:hover:text-white dark:hover:bg-zinc-700/20"
                    >
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="relative flex items-center gap-2 cursor-pointer p-0 hover:text-blue-lagoon-700">
                    <LogOut className="absolute left-2 h-4 w-4 text-icon-color dark:text-icon-color-dark" />
                    <Link
                      to="/login"
                      className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent text-blue-lagoon-900 hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-50 dark:hover:text-white dark:hover:bg-zinc-700/20"
                      onClick={handleLogOut}
                    >
                      Salir
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
