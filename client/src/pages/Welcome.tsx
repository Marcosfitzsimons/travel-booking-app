import { Check } from "lucide-react";
import AuthService from "../components/services/auth-service";
import { Link, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import AccountStatus from "@/components/AccountStatus";
import Logo from "@/components/Logo";

const Welcome = () => {
  const { confirmationCode } = useParams();

  if (confirmationCode) {
    AuthService.verifyUser(confirmationCode);
  }
  return (
    <div className="section flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
      <div className="w-full relative max-w-sm flex flex-col items-center gap-2 mt-6 lg:mt-0 lg:mb-28">
        <div className="absolute -top-4 flex items-center justify-center w-8 aspect-square rounded-full border-2 bg-[#5b9184] border-white dark:bg-[#4b7c71]">
          <Check className="h-5 w-5 text-white" />
        </div>
        <div className="w-full pt-6 p-5 text-center rounded-lg bg-[#5b9184] text-white dark:bg-[#4b7c71]">
          <h3 className="font-medium text-lg">
            Tu cuenta se ha activado con éxito
          </h3>
        </div>
        <Separator className="w-4 self-center my-3" />

        <div className="w-auto flex flex-col items-center gap-4 bg-card rounded-lg p-4 border shadow-input dark:shadow-none">
          <div className="w-full  text-center flex flex-col items-center">
            <div className="w-full flex flex-col items-center gap-1 ">
              <p>Estado de su cuenta</p>
              <AccountStatus isActive={true}>Activa</AccountStatus>
            </div>
          </div>
          <div className="flex">
            <div className="relative flex items-center after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
              <Button className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white">
                <Link to="/login" className="">
                  Entrar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-6 lg:mr-8 ">
        <Separator
          orientation="vertical"
          className="h-[360px] bg-gradient-to-t from-border to-[#fafafa] dark:from-pink-1-50 dark:to-[#0E1217]"
        />
        <Logo />
        <Separator
          orientation="vertical"
          className="h-[360px] bg-gradient-to-b from-border to-[#fafafa] dark:from-pink-1-50 dark:to-[#0E1217]"
        />
      </div>
    </div>
  );
};

export default Welcome;
