import { User, Map, LogOut } from "lucide-react";
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
      <div className="w-full max-w-[12rem] rounded-md flex flex-col mx-auto shadow-md gap-5 p-5 mt-6 bg-white/40 border border-border-color dark:border-border-color-dark dark:bg-black/40">
        <nav className="">
          <ul className="flex flex-col">
            <p className="text-blue-lagoon-900 uppercase pb-1 font-bold text-sm dark:text-white">
              Listas
            </p>
            <li className="relative flex items-center gap-2">
              <Map className="absolute left-2 h-5 w-5" />
              <Link
                to="/trips"
                className="w-full pl-8 z-20 rounded-lg py-1 px-2 flex items-center gap-1 text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
              >
                Viajes
              </Link>
            </li>
            <li className="relative flex items-center gap-2">
              <User className="absolute left-2 h-5 w-5" />
              <Link
                to="/users"
                className="w-full pl-8 z-20 rounded-lg py-1 px-2 flex items-center gap-1 text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
              >
                Usuarios
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="flex flex-col">
          <p className="text-blue-lagoon-900 uppercase pb-1 font-bold text-sm dark:text-white">
            Admin
          </p>
          <li className="relative flex items-center gap-2">
            <User className="absolute left-2 h-5 w-5" />
            <Link
              to="/mi-perfil"
              className="w-full pl-8 z-20 rounded-lg py-1 px-2 flex items-center gap-1 text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
            >
              Perfil
            </Link>
          </li>
          <li className="relative flex items-center gap-2">
            <LogOut className="absolute left-2 h-5 w-5" />
            <Link
              to="/login"
              onClick={handleLogOut}
              className="w-full pl-8 z-20 rounded-lg py-1 px-2 flex items-center gap-1 text-start bg-transparent hover:bg-blue-lagoon-100/20 dark:text-blue-lagoon-100 dark:hover:text-white dark:hover:bg-blue-lagoon-900/50"
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
