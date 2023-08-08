import { Check } from "lucide-react";
import AuthService from "../components/services/auth-service";
import { Link, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  const { confirmationCode } = useParams();

  if (confirmationCode) {
    AuthService.verifyUser(confirmationCode);
  }
  return (
    <div className="h-screen flex flex-col items-center gap-4">
      <div className="w-full relative max-w-sm flex flex-col items-center gap-2 mt-6">
        <div className="absolute -top-4 flex items-center justify-center w-8 aspect-square rounded-full border-2 bg-[#4E8D7C] border-white">
          <Check className="h-5 w-5 text-white" />
        </div>
        <div className="w-11/12 pt-6 mx-auto flex flex-col text-center items-center gap-1 p-3 rounded-md bg-[#4E8D7C] text-white">
          <h3 className="font-medium text-lg">Cuenta activada con éxito!</h3>
        </div>

        <div className="text-center flex flex-col items-center gap-3 w-11/12 mx-auto">
          <div className="flex flex-col items-center gap-1">
            <p>Estado de su cuenta</p>
            <p className="flex items-center gap-1 px-2 rounded-md bg-card border text-sm">
              <span className="w-[10px] aspect-square rounded-full bg-green-600 animate-pulse" />
              Activa
            </p>
          </div>
        </div>
      </div>
      <Separator className="w-4" />
      <div className="flex ">
        <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20  after:transition focus-within:after:shadow-slate-100 dark:after:shadow-highlight dark:after:shadow-white/20  dark:focus-within:after:shadow-slate-100">
          <Button className="h-[28px] p-0 relative bg-black/90 text-slate-100 hover:text-white shadow-input dark:text-slate-100 dark:hover:text-white dark:bg-black dark:shadow-none">
            <Link to="/login" className="py-2 px-4">
              Entrar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
