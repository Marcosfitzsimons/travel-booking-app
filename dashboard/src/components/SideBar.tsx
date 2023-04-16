import { LayoutDashboard, User, Map, LogOut, Ticket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SideBar = () => {
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

  return !user ? (
    <div className=""></div>
  ) : (
    <div className="hidden flex-[1] h-screen dark:text-blue-lagoon-100 lg:flex lg:flex-col lg:items-end lg:py-[200px] lg:pr-10">
      <div className="w-full max-w-[12rem] rounded-md flex flex-col mx-auto gap-5 p-5 mt-6 bg-white/40 border border-blue-lagoon-500/20 dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300 dark:bg-[#141414]">
        <div className="flex flex-col gap-1">
          <p className="text-blue-lagoon-800/30 uppercase font-bold text-sm dark:text-white">
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
            <p className="text-blue-lagoon-800/30 uppercase font-bold text-sm dark:text-white">
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
        <ul className="flex flex-col gap-1">
          <p className="text-blue-lagoon-800/30 uppercase font-bold text-sm dark:text-white">
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
            <Link
              to="/login"
              onClick={handleLogOut}
              className="w-full pl-8 z-20"
            >
              Salir
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
