import { ArrowLeft, User } from "lucide-react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BackButton from "./BackButton";
import DefaultButton from "./DefaultButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate("/mi-perfil/editar-perfil");
  };

  return (
    <div className="relative w-full shadow-md mx-auto mt-6 p-3 py-16 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center dark:bg-[#262626] dark:border-zinc-700">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="w-11/12 flex flex-col items-center gap-5 md:w-7/12 md:py-12 md:px-4 md:rounded-md md:border md:bg-[#fafafa] md:border-neutral-400 md:dark:bg-neutral-900 md:dark:border-neutral-500">
        <Avatar className="w-32 h-32">
          <AvatarImage
            className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
            src={!user ? "" : user?.image}
            alt="avatar"
          />
          <AvatarFallback>
            <User className="w-12 h-12" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center">
          <h4 className="font-medium text-xl">{!user ? "" : user.fullName}</h4>
          <h4 className="text-[#737373]">@{!user ? "" : user.username}</h4>
        </div>
        <div className="flex flex-col w-full bg-[#fafafa] gap-2 max-w-sm border border-slate-200 items-start p-4 shadow-inner rounded-md dark:bg-neutral-800 dark:border-neutral-600">
          {!user ? (
            ""
          ) : (
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          )}
          {!user ? (
            ""
          ) : (
            <p>
              <span className="font-medium">Celular:</span> {user.phone}
            </p>
          )}
          {!user ? (
            ""
          ) : (
            <p>
              <span className="font-medium">Dirrección (Carmen):</span>{" "}
              {user.addressCda}
            </p>
          )}
          {user?.addressCapital ? (
            <p>Dirrecion Capital: {!user ? "" : user.addressCapital}</p>
          ) : (
            ""
          )}
        </div>

        <div className="w-[min(24rem,100%)]" onClick={goToEditProfile}>
          <DefaultButton>Editar perfil</DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
