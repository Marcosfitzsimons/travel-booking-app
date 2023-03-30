import { Mail, MapPin, Phone, User } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import DefaultButton from "./DefaultButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserInfo = ({ userData, loading }) => {
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate("/mi-perfil/editar-perfil");
  };

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

  return (
    <div className="w-full mx-auto mt-5 mb-16 bg-transparent flex flex-col gap-5 items-center">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full relative px-3 flex flex-col items-center gap-5 md:w-7/12"
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
        {loading ? (
          <div className="">loading...</div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h4 className="font-medium text-xl">{userData?.fullName}</h4>
              <h4 className="text-[#737373]">@{userData?.username}</h4>
            </div>
            <div className="flex flex-col w-full bg-[#fafafa] gap-2 max-w-sm border border-blue-lagoon-700/50 items-start p-4 shadow-inner rounded-md dark:bg-[#0d0f12] dark:border-blue-lagoon-200">
              <p className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span className="font-medium">Email:</span> {userData?.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="font-medium">Celular:</span> {userData?.phone}
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Dirrección (Carmen):</span>{" "}
                {userData?.addressCda}
              </p>
              {userData?.addressCapital && (
                <p className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Dirrecion Capital:</span>{" "}
                  {userData?.addressCapital}
                </p>
              )}
            </div>
          </>
        )}

        <div className="w-[min(24rem,100%)]" onClick={goToEditProfile}>
          <DefaultButton>Editar perfil</DefaultButton>
        </div>
      </motion.div>
    </div>
  );
};

export default UserInfo;
