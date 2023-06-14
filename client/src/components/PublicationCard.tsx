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
    <article className="w-full relative max-w-lg rounded-md border border-border-color bg-white/80 px-2 pt-6 pb-10 flex flex-col gap-3 lg:px-4 lg:pt-[10px] dark:border-border-color-dark dark:bg-black/60">
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
          <AvatarImage
            src={logo}
            alt="fabebus"
            className="border border-border-color rounded-full"
          />
          <AvatarFallback>Fabebus</AvatarFallback>
        </Avatar>
        <p className="text-black font-medium dark:text-white">
          Fabebus{" "}
          <span className="text-[#737373] font-extralight dark:text-slate-500 text-sm">
            @fabebus
          </span>
        </p>
      </div>
      <h3 className="font-medium text-lg dark:text-white">
        Nombre publicación
      </h3>
      <div className="">
        <p className="text-slate-600 dark:text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
          reprehenderit assumenda. Totam, architecto labore?
        </p>
      </div>
      <p className="absolute right-2 top-2 text-sm lg:right-4">
        Martes 05/11
        <span className="text-[#737373] font-extralight dark:text-slate-500 text-sm">
          {" "}
          - 11:29 AM
        </span>
      </p>
    </article>
  );
};

export default PublicationCard;
