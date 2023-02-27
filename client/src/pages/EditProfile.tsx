import { ArrowLeft, Edit } from "lucide-react";
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

const EditProfile = () => {
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="section">
      <div className="">
        <h2 className="text-3xl font-medium text-center">Editar perfil</h2>
        <form
          onSubmit={handleOnSubmit}
          className="relative w-10/12 max-w-2xl mx-auto mt-6 p-3 py-6 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center dark:bg-[#262626] dark:border-zinc-700"
        >
          <div className="absolute top-2 left-2">
            <Button className="px-1 py-1 pr-3" variant="ghost">
              <ArrowLeft className="mr-1 w-5 aspect-square" />
              Volver
            </Button>
          </div>
          <div className="w-10/12 flex flex-col items-center gap-5">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                  src="https://github.com/shadcn.png"
                  alt="profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="absolute bottom-0 -right-2 rounded-full p-1"
                    >
                      <Edit className="w-5 h-5 text-black dark:text-slate-100" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar imagen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="w-11/12 flex flex-col gap-2 sm:gap-3">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" placeholder="@yourusername" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Input type="text" id="name" placeholder="Nombre" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastname">Apellido</Label>
                <Input type="text" id="lastname" placeholder="Apellido" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="tel">Celular</Label>
                <Input type="tel" id="tel" placeholder="Celular" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="address">Direccion (Carmen)</Label>
                <Input
                  type="text"
                  id="address"
                  placeholder="Direccion (Carmen)"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="address-cap">Direccion (Capital)</Label>
                <Input
                  type="text"
                  id="address-cap"
                  placeholder="Direccion (Capital)"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center sm:mt-8">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
