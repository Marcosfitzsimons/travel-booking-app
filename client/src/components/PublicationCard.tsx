import React from "react";
import logo from "../assets/fabebus-logo.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronsDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const PublicationCard = () => {
  return (
    <article className="w-full relative max-w-md rounded-md border border-border-color bg-white/80 px-4 py-8 flex flex-col gap-3 dark:border-border-color-dark dark:bg-black/60 lg:pt-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="absolute self-center bottom-1">
              <ChevronsDown className="" />
              <span className="sr-only">Arrow Down</span>
            </button>
          </TooltipTrigger>
          <TooltipContent className="">
            <p className="">Ver más</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={logo} alt="fabebus" />
          <AvatarFallback>Fabebus</AvatarFallback>
        </Avatar>
        <h3 className="font-medium text-lg dark:text-white">
          Nombre publicación
        </h3>
      </div>
      <div className="">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
          reprehenderit assumenda. Totam, architecto labore?
        </p>
      </div>
      <p className="absolute right-2 top-2 text-sm">
        Martes 05/11<span className="font-light"> - 11:29 AM</span>
      </p>
    </article>
  );
};

export default PublicationCard;
