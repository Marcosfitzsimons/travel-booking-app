import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

type ButtonProps = {
  linkTo: string;
};

const BackButton = ({ linkTo }: ButtonProps) => {
  return (
    <div className="flex items-center relative after:rounded-full after:absolute after:pointer-events-none after:inset-px after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
      <Link
        to={linkTo}
        className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:hover:text-white"
      >
        <ChevronLeft className="h-5 w-5 shrink-0 text-secondary-foreground" />
      </Link>
    </div>
  );
};

export default BackButton;
