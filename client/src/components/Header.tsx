import { RoughNotation } from "react-rough-notation";
import { motion } from "framer-motion";

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

const Header = () => {
  return (
    <header className="fixed w-full z-10 backdrop-blur-md bg-[#ffffff40] dark:bg-black/50">
      <div className="w-[min(90%,1200px)] mx-auto py-3 flex justify-between items-center">
        <RoughNotation type="underline" show={true} color="#bd284d" padding={2}>
          <motion.div className="" whileHover={{ scale: 1.1 }}>
            <a href="/" className="font-serif tracking-wider">
              <span className="font-medium text-xl">F</span>
              <span className="inline-block rotate-3">a</span>
              <span className="inline-block -rotate-6">b</span>
              <span className="inline-block rotate-1">e</span>
              <span className="font-medium text-xl">B</span>
              <span className="inline-block rotate-6">u</span>
              <span className="inline-block -rotate-3">s</span>
            </a>
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
            <div className="hidden">
              <Button>Entrar</Button>
              <Button>Registrarme</Button>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Mis Viajes
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Configuracion
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
