import { ChevronsLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const BackButton = () => {
  {
    // check link
  }
  return (
    <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] dark:after:shadow-highlight dark:after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
      <Button className="relative flex items-center h-8 rounded-lg shadow-sm shadow-blue-lagoon-500/10 border border-blue-lagoon-200 bg-white hover:border-blue-lagoon-400 dark:bg-neutral-900 dark:text-slate-100 dark:hover:text-white dark:shadow-input dark:shadow-black/5 dark:border-none">
        <ChevronsLeft className="mr-1 w-5 aspect-square" />
        <Link to="/register">Volver</Link>
      </Button>
    </div>
  );
};

export default BackButton;