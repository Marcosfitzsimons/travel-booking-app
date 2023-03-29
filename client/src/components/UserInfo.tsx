import { User } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import DefaultButton from "./DefaultButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserInfo = ({ userData, loading }) => {
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate("/mi-perfil/editar-perfil");
  };

  return (
    <div className="w-full mx-auto mt-6 bg-transparent flex flex-col gap-5 items-center">
      <div className="w-full relative bg-white rounded-md border border-blue-lagoon-700/50 px-3 py-16 flex flex-col items-center gap-5 md:w-7/12 md:py-12 dark:bg-[#262626] dark:border-neutral-600">
        <div className="absolute top-3 left-3">
          <BackButton />
        </div>
        <Avatar className="w-32 h-32">
          <AvatarImage
            className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
            src={userData?.image}
            alt="avatar"
          />
          <AvatarFallback>
            <User className="w-12 h-12" />
          </AvatarFallback>
        </Avatar>
        {loading ? (
          <div className="">loading...</div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h4 className="font-medium text-xl">{userData?.fullName}</h4>
              <h4 className="text-[#737373]">@{userData?.username}</h4>
            </div>
            <div className="flex flex-col w-full bg-[#fafafa] gap-2 max-w-sm border border-blue-lagoon-700/50 items-start p-4 shadow-inner rounded-md dark:bg-[#0d0f12] dark:border-blue-lagoon-900/50">
              <p>
                <span className="font-medium">Email:</span> {userData?.email}
              </p>
              <p>
                <span className="font-medium">Celular:</span> {userData?.phone}
              </p>

              <p>
                <span className="font-medium">Dirrección (Carmen):</span>{" "}
                {userData?.addressCda}
              </p>
              {userData?.addressCapital && (
                <p>Dirrecion Capital: {userData?.addressCapital}</p>
              )}
            </div>
          </>
        )}

        <div className="w-[min(24rem,100%)]" onClick={goToEditProfile}>
          <DefaultButton>Editar perfil</DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
