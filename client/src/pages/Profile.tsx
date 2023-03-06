import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Button } from "../components/ui/button";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  if (!user) navigate("/login");
  return (
    <section className="section">
      <div className="">
        <h2 className="text-3xl font-medium">Perfil</h2>
        <div className="relative w-full max-w-2xl shadow-md mx-auto mt-6 p-3 py-16 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center dark:bg-neutral-900 dark:border-zinc-700">
          <div className="absolute top-2 left-2">
            <Link
              to="/viajes"
              className="px-1 py-1 pr-2 flex items-center text-neutral-600 rounded-md hover:bg-neutral-200/60 hover:text-black dark:hover:bg-neutral-600/50 dark:text-neutral-200 dark:hover:text-white"
            >
              <ArrowLeft className="mr-1 w-5 aspect-square" />
              Volver
            </Link>
          </div>
          <div className="w-10/12 flex flex-col items-center gap-5">
            <Avatar className="w-32 h-32">
              <AvatarImage
                className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                src={!user ? "https://i.pravatar.cc/200" : user.image}
                alt="avatar"
              />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center">
              <h4 className="font-medium text-xl">
                {!user ? "" : user.name + " " + user.lastName}
              </h4>
              <h4 className="text-[#737373]">@{!user ? "" : user.username}</h4>
            </div>
            <div className="flex flex-col w-[90%] bg-[#fafafa] gap-2 max-w-sm mx-auto border border-slate-200 items-start p-4 shadow-inner rounded-md dark:bg-neutral-800 dark:border-neutral-600">
              {!user ? (
                ""
              ) : (
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              )}
              {!user ? (
                ""
              ) : (
                <p>
                  <span className="font-medium">Celular:</span> {user.phone}
                </p>
              )}
              {!user ? (
                ""
              ) : (
                <p>
                  <span className="font-medium">Dirrección (Carmen):</span>{" "}
                  {user.addressCda}
                </p>
              )}
              {user?.addressCapital ? (
                <p>Dirrecion Capital: {!user ? "" : user.addressCapital}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <Button className="w-full max-w-[9rem] bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black dark:hover:bg-white">
            <Link to="/mi-perfil/editar-perfil">Editar perfil</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
