import React from "react";
import logo from "../assets/fabebus-logo.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const PublicationCard = () => {
  return (
    <article className="w-full relative rounded-md border border-border-color bg-white/80 p-4 py-6 flex flex-col gap-3 dark:border-border-color-dark dark:bg-black/60">
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={logo} alt="fabebus" />
          <AvatarFallback>Fabebus</AvatarFallback>
        </Avatar>
        <h3>Nombre publicación</h3>
      </div>
      <div className="">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
          reprehenderit assumenda. Totam, architecto labore?
        </p>
      </div>
      <p className="absolute right-2 top-2 font-medium">
        Martes 05/11 11:29 AM
      </p>
    </article>
  );
};

export default PublicationCard;
