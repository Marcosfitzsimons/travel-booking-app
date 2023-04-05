import { LayoutDashboard, User, Map, LogOut } from "lucide-react";
import Logo from "./Logo";

const SideBar = () => {
  return (
    <div className="flex-[1] flex flex-col bg-[#fafafa] dark:bg-[#0d0f12] h-screen border-r border-r-blue-lagoon-700/50 dark:border-r-neutral-600">
      <div className="w-full flex items-center justify-center py-[15px] border-b border-b-blue-lagoon-700/50 dark:border-b-neutral-600 ">
        <Logo />
      </div>
      <div className="flex flex-col gap-5 px-4 mt-6">
        <div className="flex flex-col gap-1">
          <p className="text-blue-lagoon-800/30 uppercase font-bold text-sm">
            Principal
          </p>
          <div className="px-2 flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" />
            <a href="#">Dashboard</a>
          </div>
        </div>
        <nav className="">
          <ul className="flex flex-col gap-1">
            <p className="text-blue-lagoon-800/30 uppercase font-bold text-sm">
              Listas
            </p>
            <li className="px-2 flex items-center gap-2">
              <User className="h-5 w-5" />
              <a href="#">Usuarios</a>
            </li>
            <li className="px-2 flex items-center gap-2">
              <Map className="h-5 w-5" />
              <a href="#">Viajes</a>
            </li>
            {/* Reservas / Pasajes */}
          </ul>
        </nav>
        <div className="">
          <ul className="flex flex-col gap-1">
            <p className="text-blue-lagoon-800/30 uppercase font-bold text-sm">
              Admin
            </p>
            <li className="px-2 flex items-center gap-2">
              <User className="h-5 w-5" />
              <a href="#">Perfil</a>
            </li>
            <li className="px-2 flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              <a href="#">Salir</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
