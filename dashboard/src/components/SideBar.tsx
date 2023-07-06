import { User, Map, LogOut, Newspaper } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Users } from "lucide-react";

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
    <div className="hidden flex-[1] h-screen lg:flex lg:flex-col lg:items-end lg:py-[200px] lg:pr-10">
      <div className="rounded-md flex flex-col mx-auto w-[13.5rem] shadow-input gap-5 p-5 mt-6 bg-card border dark:shadow-none">
        <nav className="">
          <ul className="flex flex-col">
            <p className="text-accent uppercase pb-1 font-bold text-sm dark:text-white">
              Listas
            </p>
            <li className="relative flex items-center gap-2">
              <Map className="absolute left-2 h-5 w-5 text-accent " />
              <Link
                to="/trips"
                className="w-full pl-8 z-20 rounded-lg py-1 px-2 flex items-center gap-1 text-start bg-transparent hover:bg-hover/40 dark:hover:text-white "
              >
                Viajes semanales
              </Link>
            </li>
            <li className="relative flex items-center gap-2">
              <Map className="absolute left-2 h-5 w-5 text-accent " />
              <Link
                to="/special-trips"
                className="w-full pl-8 z-20 rounded-lg py-1 px-2 flex items-center gap-1 text-start bg-transparent hover:bg-hover/40 dark:hover:text-white "
              >
                Viajes particulares
              </Link>
            </li>
            <li className="relative flex items-center gap-2">
              <Users className="absolute left-2 h-5 w-5 text-accent " />
              <Link
                to="/users"
                className="w-full pl-8 z-20 rounded-lg py-1 px-2 flex items-center gap-1 text-start bg-transparent hover:bg-hover/40 dark:hover:text-white "
              >
                Usuarios
              </Link>
            </li>
            <li className="relative flex items-center gap-2">
              <Newspaper className="absolute left-2 h-5 w-5 text-accent " />
              <Link
                to="/publications"
                className="w-full pl-8 z-20 rounded-lg py-1 px-2 flex items-center gap-1 text-start bg-transparent hover:bg-hover/40  dark:hover:text-white "
              >
                Publicaciones
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="flex flex-col">
          <p className="text-accent uppercase pb-1 font-bold text-sm dark:text-white">
            Admin
          </p>
          <li className="relative flex items-center gap-2">
            <User className="absolute left-2 h-5 w-5 text-accent " />
            <Link
              to="/mi-perfil"
              className="w-full pl-8 z-20 rounded-lg py-1 px-2 flex items-center gap-1 text-start bg-transparent hover:bg-hover/40  dark:hover:text-white "
            >
              Perfil
            </Link>
          </li>
          <li className="relative flex items-center gap-2">
            <LogOut className="absolute left-2 h-5 w-5 text-accent " />
            <Link
              to="/login"
              onClick={handleLogOut}
              className="w-full pl-8 z-20 rounded-lg py-1 px-2 flex items-center gap-1 text-start bg-transparent hover:bg-hover/40  dark:hover:text-white "
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
