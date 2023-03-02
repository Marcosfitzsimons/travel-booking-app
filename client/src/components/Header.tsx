import { RoughNotation } from "react-rough-notation";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="fixed w-full z-10 backdrop-blur-md bg-[#ffffff40] dark:bg-black/50">
      <div className="w-[min(90%,1200px)] mx-auto py-3 flex justify-between items-center">
        <RoughNotation type="underline" show={true} color="#bd284d" padding={2}>
          <motion.div className="" whileHover={{ scale: 1.1 }}>
            <Link to="/" className="font-serif tracking-wider">
              <span className="font-medium text-xl">F</span>
              <span className="inline-block rotate-3">a</span>
              <span className="inline-block -rotate-6">b</span>
              <span className="inline-block rotate-1">e</span>
              <span className="font-medium text-xl">B</span>
              <span className="inline-block rotate-6">u</span>
              <span className="inline-block -rotate-3">s</span>
            </Link>
          </motion.div>
        </RoughNotation>
        <div className=" flex items-center gap-2">
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
            <ThemeToggle />
          </div>
          {!user ? (
            <div className="flex items-center gap-1">
              <Link
                to="/login"
                className="bg-black rounded-md px-5 py-2 text-white font-medium dark:bg-slate-700"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="bg-black rounded-md px-5 py-2 text-white font-medium dark:bg-slate-700"
              >
                Registrarme
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={user.image ? user.image : "https://i.pravatar.cc/150"}
                  />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
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
                    to="/misviajes"
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
                  >
                    <LogOut className="w-4 h-4" />
                    Salir
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
