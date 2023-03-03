import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Profile = () => {
  const { loading, error, user } = useContext(AuthContext);

  return (
    <section className="section">
      <div className="">
        <h2 className="text-3xl font-medium">Mi perfil</h2>
        <div className="relative w-10/12 max-w-2xl mx-auto mt-6 p-3 py-6 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center dark:bg-[#262626] dark:border-zinc-700">
          <div className="absolute top-2 left-2">
            <Link to="/viajes" className="px-1 py-1 pr-3 flex items-center">
              <ArrowLeft className="mr-1 w-5 aspect-square" />
              Volver
            </Link>
          </div>
          <div className="w-10/12 flex flex-col items-center gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage
                className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                src={user.image ? user.image : "https://i.pravatar.cc/200"}
                alt="avatar"
              />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <p>{user.username}</p>
            <div className="w-11/12 flex flex-col sm:gap-3">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <p>Nombre: {user.name}</p>
                <p>Apellido: {user.lastName}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <p>Celular: {user.phone ? user.phone : "Agregar numero"}</p>
                <p>Email: {user.email}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <p>Dirrecion: {user.addressCda}</p>
                <p>
                  Dirrecion Capital:{" "}
                  {user.addressCapital
                    ? user.addressCapital
                    : "Agregar direccion capital"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center sm:mt-8">
            <Link to="/mi-perfil/editar-perfil">Editar</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
