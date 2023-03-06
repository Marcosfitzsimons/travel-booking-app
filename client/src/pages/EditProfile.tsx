import { ArrowLeft, Edit, Pencil, Edit2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="">
      <div className="">
        <h2 className="text-3xl font-medium">Editar perfil</h2>
        <div className="relative w-full max-w-2xl shadow-md mx-auto mt-6 p-3 py-16 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center dark:bg-neutral-900 dark:border-zinc-700">
          <div className="absolute top-4 left-4">
            <Link
              to="/mi-perfil"
              className="px-2 py-1 pr-4 flex items-center shadow-sm text-neutral-600 rounded-md border border-slate-200 hover:border-neutral-400 hover:bg-white hover:text-black dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-white dark:hover:border-white"
            >
              <ArrowLeft className="mr-1 w-5 aspect-square" />
              Volver
            </Link>
          </div>
          <div className="w-11/12 flex flex-col items-center gap-5">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                  src={!user ? "https://i.pravatar.cc/200" : user.image}
                  alt="avatar"
                />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 rounded-full p-2 bg-slate-800 border-2 border-[#fdfafa] dark:border-[#262626] dark:bg-white"
                    >
                      <Pencil className="w-4 h-4 text-slate-200 dark:text-slate-700" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar imagen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <form
              onSubmit={handleOnSubmit}
              className="w-full flex flex-col items-center gap-3"
            >
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  value={!user ? "" : user.username}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input
                  type="text"
                  id="fullName"
                  value={!user ? "" : user.fullName}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="tel">Celular</Label>
                <Input
                  type="tel"
                  id="tel"
                  value={!user ? "" : String(user.phone)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={!user ? "" : user.email}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="address">Direccion (Carmen)</Label>
                <Input
                  type="text"
                  id="address"
                  value={!user ? "" : user.addressCda}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="address-cap">Direccion (Capital)</Label>
                <Input
                  type="text"
                  id="address-cap"
                  value={!user ? "" : user.addressCapital}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-neutral-900 text-white max-w-sm  dark:bg-neutral-100 dark:text-black dark:hover:bg-white"
              >
                <Link to="/mi-perfil">Guardar</Link>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
