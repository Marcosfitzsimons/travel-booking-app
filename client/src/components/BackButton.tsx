import { ChevronsLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

type ButtonProps = {
  toProfile: boolean;
};

const BackButton = ({ toProfile }: ButtonProps) => {
  return (
    <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] dark:after:shadow-highlight dark:after:shadow-white/30 focus-within:after:shadow-[#77f6aa] after:transition">
      <Button className="relative flex items-center h-8 rounded-lg shadow-sm text-blue-lagoon-600 shadow-blue-lagoon-900/30 bg-white border border-blue-lagoon-200 hover:bg-white hover:border-blue-lagoon-600/50 dark:bg-blue-lagoon-900/40 dark:text-blue-lagoon-100 dark:shadow-input dark:shadow-black/5 dark:border-none dark:hover:text-white dark:hover:bg-blue-lagoon-900/80">
        <ChevronsLeft className="mr-1 w-5 aspect-square" />
        <Link to={toProfile ? "/mi-perfil" : "/viajes"}>Volver</Link>
      </Button>
    </div>
  );
};

export default BackButton;
