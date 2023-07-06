import {
  Contact,
  ContactIcon,
  Crop,
  Fingerprint,
  Mail,
  MapPin,
  Milestone,
  Phone,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "./DefaultButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

type addressCda = {
  street: string;
  streetNumber: number | undefined;
  crossStreets: string;
};

type UserData = {
  _id: string;
  fullName: string;
  username: string;
  addressCda: addressCda;
  addressCapital: string;
  dni: number | undefined;
  phone: undefined | number;
  email: string;
  image?: string;
};

interface UserInfoProps {
  userData: UserData;
}

const UserInfo = ({ userData }: UserInfoProps) => {
  return (
    <div className="w-full relative flex flex-col items-center gap-5">
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

      <div className="flex flex-col items-center">
        <h3 className="font-medium text-xl dark:text-white ">
          {userData?.fullName}
        </h3>
        <h4 className="text-[#737373] dark:text-slate-500">
          @{userData?.username}
        </h4>
        <Separator className="hidden w-8 self-center bg-border mt-7 lg:flex " />
      </div>

      <div className="flex flex-col w-full overflow-hidden gap-2 max-w-sm items-start px-2 lg:px-0 lg:flex-row lg:pt-0 lg:justify-around lg:max-w-6xl">
        <div className="w-full flex flex-col gap-1 lg:basis-1/3 lg:my-2">
          <Separator className="w-8 self-center my-2 bg-border lg:hidden " />
          <h5 className="text-center w-full font-medium dark:text-white lg:mb-2 lg:text-xl">
            Datos personales
          </h5>

          <ul className="flex flex-col w-full overflow-hidden gap-1 lg:shadow-md lg:py-2 lg:px-4 lg:rounded-md lg:bg-card lg:border lg:dark:shadow-none">
            <li className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-accent shrink-0 " />
              <span className="font-medium">Email:</span>
              {userData?.email}
            </li>
            <li className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-accent " />
              <span className="font-medium">Celular:</span> {userData?.phone}
            </li>
            <li className="flex items-center gap-1 shrink-0">
              <Fingerprint className="w-4 h-4 text-accent  shrink-0" />
              <span className="font-medium shrink-0">DNI:</span>
              <span className="shrink-0">{userData?.dni}</span>
            </li>
          </ul>
        </div>

        <div className="w-full flex flex-col gap-1 lg:basis-[60%] lg:my-2">
          <Separator className="w-8 self-center my-2 bg-border lg:hidden " />
          <h5 className="text-center w-full font-medium dark:text-white lg:mb-2 lg:text-xl">
            Domicilios
          </h5>
          <div className="flex flex-col gap-1 lg:shadow-md lg:flex-row lg:justify-between lg:py-2 lg:px-4 lg:rounded-md lg:bg-card lg:border lg:dark:shadow-none">
            <div className="flex flex-col gap-1 lg:basis-[55%]">
              <h6 className="font-serif text-accent ">Carmen de Areco</h6>
              <div className="flex items-center gap-1">
                <Milestone className="w-4 h-4 text-accent " />
                <span className="font-medium dark:text-white">Dirreción:</span>
                <p>{`${userData?.addressCda.street} ${userData?.addressCda.streetNumber}`}</p>
              </div>
              <div className="flex flex-col gap-[2px] sm:flex-row sm:items-center sm:gap-1">
                <div className="flex items-center gap-1">
                  <Crop className="w-4 h-4 text-accent " />
                  <span className="font-medium dark:text-white">
                    Calles que cruzan:
                  </span>
                </div>
                <span className="">{userData?.addressCda.crossStreets}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 lg:basis-[40%]">
              <h6 className="font-serif text-accent ">Capital Federal</h6>
              <div className="flex items-center gap-1">
                <Milestone className="w-4 h-4 text-accent " />
                <span className="font-medium dark:text-white">
                  Dirreción:
                </span>{" "}
                <p>{userData?.addressCapital}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
