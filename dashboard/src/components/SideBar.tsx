import { LayoutDashboard, User, Map, LogOut, Ticket } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex-[1] flex flex-col bg-[#fafafa] dark:bg-[#0d0f12] h-screen border-r border-r-blue-lagoon-700/50 dark:border-r-neutral-600">
      <div className="w-full flex items-center justify-center py-[15px] border-b border-b-blue-lagoon-700/50 dark:border-b-neutral-600 ">
        <Logo />
      </div>
      <div className="w-full max-w-[12rem] flex flex-col gap-5 px-4 mt-6">
        <div className="flex flex-col gap-1">
          <p className="text-blue-lagoon-800/30 uppercase font-bold text-sm">
            Principal
          </p>
          <div className="relative flex items-center gap-2">
            <LayoutDashboard className="absolute left-2 h-5 w-5" />
            <Link to="/" className="z-20 w-full pl-8">
              Dashboard
            </Link>
          </div>
        </div>
        <nav className="">
          <ul className="flex flex-col gap-1">
            <p className="text-blue-lagoon-800/30 uppercase font-bold text-sm">
              Listas
            </p>
            <li className="relative flex items-center gap-2">
              <User className="absolute left-2 h-5 w-5" />
              <Link to="/users" className="z-20 w-full pl-8">
                Usuarios
              </Link>
            </li>
            <li className="relative flex items-center gap-2">
              <Map className="absolute left-2 h-5 w-5" />
              <Link to="/trips" className="z-20 w-full pl-8">
                Viajes
              </Link>
            </li>
            <li className="relative flex items-center gap-2">
              <Ticket className="absolute left-2 h-5 w-5" />
              <Link to="/passengers" className="z-20 w-full pl-8">
                Pasajeros
              </Link>
            </li>
          </ul>
        </nav>
        <div className="">
          <ul className="flex flex-col gap-1">
            <p className="text-blue-lagoon-800/30 uppercase font-bold text-sm">
              Admin
            </p>
            <li className="relative flex items-center gap-2">
              <User className="absolute left-2 h-5 w-5" />
              <Link to="/mi-perfil" className="w-full pl-8 z-20">
                Perfil
              </Link>
            </li>
            <li className="relative flex items-center gap-2">
              <LogOut className="absolute left-2 h-5 w-5" />
              <Link to="/login" className="w-full pl-8 z-20">
                Salir
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
