import { ChevronsLeft } from "lucide-react";
import { Link } from "react-router-dom";

type ButtonProps = {
  linkTo: string;
};

const BackButton = ({ linkTo }: ButtonProps) => {
  return (
    <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] mb-5 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-300/60 after:transition dark:after:hover:shadow-blue-lagoon-300/80 focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200">
      <Link
        to={linkTo}
        className="h-8 py-2 pr-[15px] pl-8 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 rounded-lg shadow-sm shadow-blue-lagoon-900/30 bg-white border border-blue-lagoon-200 hover:bg-white hover:border-blue-lagoon-600/50 dark:bg-black dark:text-blue-lagoon-100 dark:shadow-input dark:shadow-black/5 dark:border-none dark:hover:text-white"
      >
        <ChevronsLeft className="w-5 h-5 absolute left-2 aspect-square dark:text-blue-lagoon-100 cursor-pointer" />
        Volver
      </Link>
    </div>
  );
};

export default BackButton;
