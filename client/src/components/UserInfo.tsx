import { Contact, ContactIcon, Mail, MapPin, Phone, User } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DefaultButton from "./DefaultButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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

type UserData = {
  _id: string;
  fullName: string;
  username: string;
  addressCapital: string;
  addressCda: string;
  email: string;
  image?: string;
  myTrips: TripProps[];
  phone: undefined | number;
  dni: number | undefined;
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
          <h4 className="text-[#737373]">@{userData?.username}</h4>
        </div>
        <ul className="flex flex-col w-full overflow-hidden bg-white gap-2 max-w-sm border border-border-color items-start p-4 shadow-inner rounded-md dark:bg-black/60 dark:border-zinc-500">
          <li className="flex items-center gap-1">
            <Mail className="h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
            <span className="font-medium">Email:</span>
            {userData?.email}
          </li>
          <li className="flex items-center gap-1">
            <Phone className="h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
            <span className="font-medium">Celular:</span> {userData?.phone}
          </li>
          <li className="flex items-center gap-1 shrink-0">
            <ContactIcon className="w-4 h-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300 shrink-0" />
            <span className="font-medium shrink-0">DNI:</span>
            <span className="shrink-0">{userData?.dni}</span>
          </li>
          <li className="flex items-center gap-1 shrink-0">
            <MapPin className="w-4 h-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300 shrink-0" />
            <span className="font-medium shrink-0">Dirreción (Carmen):</span>
            <span className="shrink-0">{userData?.addressCda}</span>
          </li>
          <li className="flex items-center gap-1 shrink-0">
            <MapPin className="w-4 h-4 text-blue-lagoon-900/60  dark:text-blue-lagoon-300 shrink-0" />
            <span className="font-medium shrink-0">Dirreción (Capital):</span>
            <span className="shrink-0">{userData?.addressCapital}</span>
          </li>
        </ul>

        <div className="w-[min(9rem,100%)]" onClick={goToEditProfile}>
          <DefaultButton>Editar perfil</DefaultButton>
        </div>
      </motion.div>
    </div>
  );
};

export default UserInfo;
