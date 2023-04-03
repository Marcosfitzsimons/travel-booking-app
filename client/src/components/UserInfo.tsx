import { Mail, MapPin, Phone, User } from "lucide-react";
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
  addressCapital: string;
  addressCda: string;
  email: string;
  fullName: string;
  image?: string;
  myTrips: TripProps[];
  phone: undefined | number;
  username: string;
};
interface UserInfoProps {
  userData: UserData;
}

const sectionVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: "backInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "backInOut",
    },
  },
};

const UserInfo = ({ userData }: UserInfoProps) => {
  const navigate = useNavigate();
  console.log(userData);

  const goToEditProfile = () => {
    navigate("/mi-perfil/editar-perfil");
  };

  return (
    <div className="w-full mt-5 mb-16 bg-transparent flex flex-col gap-5">
      <motion.div
        variants={sectionVariants}
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
          <h4 className="font-medium text-xl dark:text-white ">
            {userData?.fullName}
          </h4>
          <h4 className="text-[#737373]">@{userData?.username}</h4>
        </div>
        <ul className="flex flex-col w-full overflow-hidden bg-white gap-2 max-w-sm border border-blue-lagoon-700/50 items-start p-4 shadow-inner rounded-md dark:bg-black dark:border-blue-lagoon-200">
          <li className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span className="font-medium">Email:</span>
            {userData?.email}
          </li>
          <li className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span className="font-medium">Celular:</span> {userData?.phone}
          </li>

          <li className="flex items-center gap-1 shrink-0">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="font-medium shrink-0">Dirrección Carmen:</span>
            <span className="shrink-0">{userData?.addressCda}</span>
          </li>
          {userData?.addressCapital && (
            <li className="flex items-center gap-1 shrink-0">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="font-medium shrink-0">Dirrecion Capital:</span>
              <span className="shrink-0">{userData?.addressCapital}</span>
            </li>
          )}
        </ul>

        <div className="w-[min(24rem,100%)]" onClick={goToEditProfile}>
          <DefaultButton>Editar perfil</DefaultButton>
        </div>
      </motion.div>
    </div>
  );
};

export default UserInfo;
