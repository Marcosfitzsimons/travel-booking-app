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
      <Button className="flex items-center h-8 rounded-lg relative bg-neutral-900 text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:hover:text-white">
        <ChevronsLeft className="mr-1 w-5 aspect-square" />
        <Link to="/register">Volver</Link>
      </Button>
    </div>
  );
};

export default BackButton;
