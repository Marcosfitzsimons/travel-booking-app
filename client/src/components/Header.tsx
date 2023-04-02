import { Link, useNavigate } from "react-router-dom";
import {
  Bus,
  CalendarRange,
  ClipboardList,
  LogOut,
  Menu,
  Star,
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
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Separator } from "./ui/separator";
import Logo from "./Logo";

type HeaderProps = {
  setIsUserInfo: (value: boolean) => void;
};

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
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <header className="fixed w-full z-50 bg-[#fafafa] dark:bg-[#0d0f12] border-b border-b-blue-lagoon-700/50 dark:border-b-neutral-600">
      <div className="w-[min(90%,1000px)] mx-auto py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="lg:hidden" asChild>
                <Button
                  variant="ghost"
                  className="relative top-[1px] w-8 h-8 rounded-md p-0 dark:hover:text-white dark:hover:bg-blue-lagoon-900/70"
                >
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem className="cursor-pointer p-0">
                  <Link
                    to="/viajes"
                    onClick={() => setIsUserInfo(false)}
                    className="rounded-lg py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
                  >
                    Viajes
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer p-0">
                  <Link
                    to="/nosotros"
                    className="rounded-lg py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
                  >
                    Nosotros
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  className="font-medium py-2 px-2 rounded-md hover:bg-blue-lagoon-300/10 dark:text-white dark:hover:bg-blue-lagoon-900/70"
                >
                  Viajes
                </Link>
              </li>
              <li>
                <Link
                  to="/nosotros"
                  className="font-medium  py-2 px-2 rounded-md hover:bg-blue-lagoon-300/10 dark:text-white dark:hover:bg-blue-lagoon-900/70"
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
              <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                <Button className="h-8 p-0 relative bg-black text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white">
                  <Link to="/login" className="py-2 px-4">
                    Entrar
                  </Link>
                </Button>
              </div>
              <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 focus-within:after:shadow-[#77f6aa] after:transition">
                <Button className="h-8 p-0 relative bg-blue-lagoon-500 text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-blue-lagoon-500">
                  <Link to="/register" className="py-2 px-4">
                    Registrarme
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>
                      <User className="dark:text-blue-lagoon-100" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="  ">
                  <DropdownMenuLabel className="dark:text-white">
                    Mi Cuenta
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link
                      to="/mi-perfil"
                      className="rounded-lg py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/30"
                      onClick={() => setIsUserInfo(true)}
                    >
                      <User className="w-4 h-4" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link
                      to="/mi-perfil"
                      onClick={() => setIsUserInfo(false)}
                      className="rounded-lg py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/30"
                    >
                      <ClipboardList className="w-4 h-4" />
                      Mis viajes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link
                      to="/mi-perfil/editar-perfil"
                      className="rounded-lg py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/30"
                    >
                      <UserCog className="w-4 h-4" />
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link
                      to="/login"
                      className="rounded-lg py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent hover:bg-blue-lagoon-100/30 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/30"
                      onClick={handleLogOut}
                    >
                      <LogOut className="w-4 h-4" />
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
