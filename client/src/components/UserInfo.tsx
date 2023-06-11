import {
  Contact,
  ContactIcon,
  Crop,
  Mail,
  MapPin,
  Milestone,
  Phone,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DefaultButton from "./DefaultButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

type TripProps = {
  id: string;
  name: string;
  date: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  maxCapacity: number;
  price: number;
  available: boolean;
};

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
  myTrips: TripProps[];
  isReminder: boolean;
};
interface UserInfoProps {
  userData: UserData;
}

const tripVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "backInOut",
    },
  },
};

const UserInfo = ({ userData }: UserInfoProps) => {
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate("/mi-perfil/editar-perfil");
  };

  return (
    <div className="w-full mt-5 mb-16 bg-transparent flex flex-col gap-5">
      <motion.div
        variants={tripVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full relative flex flex-col items-center gap-5 md:w-7/12 md:mx-auto"
      >
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
        </div>
        <div className="flex flex-col w-full overflow-hidden gap-2 max-w-sm border border-border-color items-start p-4 bg-white shadow-inner rounded-md dark:bg-black/60 dark:border-zinc-500">
          <h5 className="text-center w-full font-medium dark:text-white">
            Mis datos
          </h5>
          <ul className="flex flex-col w-full overflow-hidden gap-2   ">
            <li className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-icon-color dark:text-icon-color-dark" />
              <span className="font-medium">Email:</span>
              {userData?.email}
            </li>
            <li className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-icon-color dark:text-icon-color-dark" />
              <span className="font-medium">Celular:</span> {userData?.phone}
            </li>
            <li className="flex items-center gap-1 shrink-0">
              <ContactIcon className="w-4 h-4 text-icon-color dark:text-icon-color-dark shrink-0" />
              <span className="font-medium shrink-0">DNI:</span>
              <span className="shrink-0">{userData?.dni}</span>
            </li>
            <li className="flex items-center gap-1 shrink-0">
              <MapPin className="w-4 h-4 text-icon-color dark:text-icon-color-dark shrink-0" />
              <span className="font-medium shrink-0">Dirreción (Carmen):</span>
              <span className="shrink-0">{userData?.addressCda.street}</span>
            </li>
            <li className="flex items-center gap-1 shrink-0">
              <MapPin className="w-4 h-4 text-icon-color  dark:text-icon-color-dark shrink-0" />
              <span className="font-medium shrink-0">Dirreción (Capital):</span>
              <span className="shrink-0">{userData?.addressCapital}</span>
            </li>
          </ul>
          <Separator className="w-8 self-center mt-2 bg-border-color lg:hidden dark:bg-border-color-dark" />
          <div className="flex flex-col gap-1">
            <h5 className="text-center w-full font-medium dark:text-white">
              Domicilios
            </h5>
            <div className="flex flex-col gap-1">
              <h6 className="font-serif dark:text-white">Carmen de Areco:</h6>
              <div className="flex items-center gap-[2px] ">
                <Milestone className="w-4 h-4 text-icon-color dark:text-icon-color-dark" />
                <span className="font-medium dark:text-white">Dirreción:</span>
                <p>{`${userData?.addressCda.street} ${userData?.addressCda.streetNumber}`}</p>
              </div>

              <div className="flex items-center gap-[2px]">
                <Crop className="w-4 h-4 text-icon-color dark:text-icon-color-dark" />
                <span className="font-medium dark:text-white">
                  Calles que cruzan:
                </span>{" "}
                {userData?.addressCda.crossStreets}
              </div>
              <h6 className="font-serif dark:text-white">Capital Federal:</h6>
              <div className="flex items-center gap-[2px]">
                <Milestone className="w-4 h-4 text-icon-color dark:text-icon-color-dark" />
                <span className="font-medium dark:text-white">Dirreción:</span>{" "}
                <p>{userData?.addressCapital}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm lg:w-[10rem]" onClick={goToEditProfile}>
          <DefaultButton>Editar perfil</DefaultButton>
        </div>
      </motion.div>
    </div>
  );
};

export default UserInfo;
