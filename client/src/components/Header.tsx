import { RoughNotation } from "react-rough-notation";
import { Link, useNavigate } from "react-router-dom";
import { Bus, LogOut, User, UserCog } from "lucide-react";
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

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const handleLogOut = () => {
    if (dispatch) {
      dispatch({
        type: "LOGOUT",
      });
      localStorage.removeItem("user");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  return (
    <header className="fixed w-full z-50 bg-[#fafafa] border-b border-b-slate-300 dark:bg-[#262626] dark:border-b-neutral-600">
      <div className="w-[min(90%,1200px)] mx-auto py-3 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-2">
          <nav>
            <ul className="hidden md:flex md:items-center md:gap-2 ">
              <li>
                <a href="">Viajes</a>
              </li>
              <li>
                <a href="">Nosotros</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Separator orientation="vertical" className="h-8" />
          {!user ? (
            <div className="flex items-center gap-1">
              <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] dark:after:shadow-highlight dark:after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                <Button
                  variant="default"
                  className="relative bg-neutral-900 text-slate-100 rounded-lg hover:text-white dark:shadow-input dark:shadow-black/5 dark:hover:text-white"
                >
                  <Link to="/login">Entrar</Link>
                </Button>
              </div>
              <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] dark:after:shadow-highlight dark:after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                <Button
                  variant="default"
                  className="relative bg-neutral-900 text-slate-100 rounded-lg hover:text-white dark:shadow-input dark:shadow-black/5 dark:hover:text-white"
                >
                  <Link to="/register">Registrarme</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="dark:text-white">
                    Mi Cuenta
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link
                      to="/mi-perfil"
                      className="py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent"
                    >
                      <User className="w-4 h-4" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link
                      to="/mis-viajes"
                      className="py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent"
                    >
                      <Bus className="w-4 h-4" />
                      Mis viajes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link
                      to="/mi-perfil/editar-perfil"
                      className="py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent"
                    >
                      <UserCog className="w-4 h-4" />
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link
                      to="/"
                      className="py-1.5 px-2 flex items-center gap-1 w-full text-start bg-transparent"
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
