import { ChevronsLeft } from "lucide-react";
import { Link } from "react-router-dom";

type ButtonProps = {
  toProfile: boolean;
};

const BackButton = ({ toProfile }: ButtonProps) => {
  return (
    <div className="flex items-center relative mb-5 after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
      <Link
        to={toProfile ? "/mi-perfil" : "/viajes"}
        className="h-8 py-2 pr-[15px] pl-8 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white"
      >
        <ChevronsLeft className="w-5 h-5 absolute left-2.5 aspect-square cursor-pointer" />
        Volver
      </Link>
    </div>
  );
};

export default BackButton;
