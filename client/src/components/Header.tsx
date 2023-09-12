import { Link } from "react-router-dom";
import {
  ChevronDown,
  ClipboardList,
  Loader2,
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
import { Separator } from "./ui/separator";
import Logo from "./Logo";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogOut";
import { useToast } from "./ui/use-toast";

const Header = () => {
  const logout = useLogout();
  const { auth } = useAuth();
  const user = auth?.user;

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="fixed w-full z-50 bg-[#fafafa] dark:bg-[#0E1217] border-b">
      <div className="w-[min(95%,1200px)] mx-auto py-3 flex justify-between items-center">
        <div className="flex items-center flex-row-reverse gap-2">
          {user && user?.status != "Pending" ? (
            <Link
              to="/viajes"
              className="rounded-md px-2 font-medium flex items-center gap-1 w-full text-start bg-transparent hover:text-hover dark:hover:text-white lg:hidden"
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
                  className="font-medium rounded-md py-1 px-3 hover:text-hover dark:hover:text-white"
                >
                  Viajes
                </Link>
              </li>
            </ul>
          </nav>
          <Separator orientation="vertical" className="hidden h-2 lg:flex" />
          <ThemeToggle />
          <Separator orientation="vertical" className="h-2" />
          {!user || user?.status != "Active" ? (
            <div className="flex items-center gap-1">
              <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20  after:transition focus-within:after:shadow-slate-100 dark:after:shadow-highlight dark:after:shadow-white/20  dark:focus-within:after:shadow-slate-100">
                <Button className="h-[28px] p-0 relative bg-black/90 text-slate-100 hover:text-white shadow-input dark:text-slate-100 dark:hover:text-white dark:bg-black dark:shadow-none">
                  <Link to="/login" className="py-2 px-4">
                    Entrar
                  </Link>
                </Button>
              </div>

              <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-100/20 dark:after:shadow-highlight dark:after:shadow-slate-100/30 after:transition focus-within:after:shadow-slate-100 dark:focus-within:after:shadow-slate-100">
                <Button
                  className="h-7 p-0 relative bg-primary shadow-input text-slate-100 hover:text-white
                dark:text-slate-100 dark:bg-primary dark:hover:text-white dark:shadow-none"
                >
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
                    <AvatarImage src={user.image ?? ""} alt="avatar picture" />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border">
                  <DropdownMenuLabel className="text-black/80 font-bold text-sm dark:text-white">
                    Mi Cuenta
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="relative flex items-center gap-2 cursor-pointer p-0 hover:bg-hover/5 dark:hover:bg-hover/50 ">
                    <User className="absolute left-2 h-4 w-4 text-accent " />
                    <Link
                      to="/mi-perfil"
                      className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent  dark:hover:text-white"
                    >
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="relative flex items-center gap-2 cursor-pointer p-0 hover:bg-hover/5 dark:hover:bg-hover/50">
                    <ClipboardList className="absolute left-2 h-4 w-4 text-accent " />
                    <Link
                      to="/mis-viajes"
                      className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent dark:hover:text-white"
                    >
                      Mis viajes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="relative flex items-center gap-2 cursor-pointer p-0 hover:bg-hover/5 dark:hover:bg-hover/50">
                    <UserCog className="absolute left-2 h-4 w-4 text-accent " />
                    <Link
                      to="/mi-perfil/editar-perfil"
                      className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent dark:hover:text-white"
                    >
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="relative flex items-center gap-2 cursor-pointer p-0 hover:bg-hover/5 dark:hover:bg-hover/50">
                    <LogOut className="absolute left-2 h-4 w-4 text-accent " />
                    <button
                      className="rounded-lg py-1.5 z-20 pl-7 px-2 flex items-center gap-1 w-full text-start bg-transparent dark:hover:text-white"
                      onClick={handleLogOut}
                    >
                      Salir
                    </button>
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
