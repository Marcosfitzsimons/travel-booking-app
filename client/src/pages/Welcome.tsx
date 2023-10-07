import { Check } from "lucide-react";
import { motion } from "framer-motion";
import AuthService from "../services/auth-service";
import { Link, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import AccountStatus from "@/components/AccountStatus";
import sectionVariants from "@/lib/variants/sectionVariants";
import GorgeousBoxBorder from "@/components/GorgeousBoxBorder";

const Welcome = () => {
  const { confirmationCode } = useParams();

  if (confirmationCode) {
    AuthService.verifyUser(confirmationCode);
  }
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="section flex "
    >
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <Check className="text-[#3d8f78] w-20 h-20 drop-shadow-sm lg:w-24 lg:h-24 dark:text-[rgba(75,270,200,1)]" />
          <p>Tu cuenta se ha activado con éxito</p>
        </div>

        <Separator className="w-2" />

        <GorgeousBoxBorder>
          <div className="w-auto flex flex-col items-center gap-4 bg-card rounded-lg py-2 px-4 border shadow-input dark:shadow-none">
            <div className="w-full flex flex-col items-center gap-1 ">
              <p>Estado de su cuenta</p>
              <AccountStatus isActive={true}>Activa</AccountStatus>
            </div>
          </div>
        </GorgeousBoxBorder>
        <Separator className="w-2" />

        <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
          <Link
            to="/login"
            className="py-1 px-4 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white "
          >
            Entrar
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Welcome;
