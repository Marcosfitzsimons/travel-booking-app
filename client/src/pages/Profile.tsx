import { useContext, useEffect, useState } from "react";
import { RoughNotation } from "react-rough-notation";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/ui/SectionTitle";
import MyTrips from "../components/MyTrips";
import UserInfo from "../components/UserInfo";
import useFetch from "../hooks/useFetch";
import BackButton from "../components/BackButton";

type ProfileProps = {
  isUserInfo: boolean;
  setIsUserInfo: (value: boolean) => void;
};

const Profile = ({ isUserInfo, setIsUserInfo }: ProfileProps) => {
  const [userTrips, setUserTrips] = useState([]);
  const [userData, setUserData] = useState({});
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const url = `http://localhost:8800/api/users/${user?._id}`;

  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    setUserTrips(data.user?.myTrips);
    setUserData(data.user);
  }, [data]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

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
    <section className="">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=""
      >
        <SectionTitle>Mi cuenta</SectionTitle>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center">
            <div className="self-start my-4">
              <BackButton toProfile={false} />
            </div>
            <nav className="flex items-center justify-center">
              <ul className="flex items-center gap-6 px-3 py-2">
                <li className="relative">
                  <button
                    tabIndex={0}
                    onClick={() => setIsUserInfo(true)}
                    className={` ${
                      isUserInfo
                        ? "font-medium dark:text-white"
                        : "dark:hover:text-white"
                    }`}
                  >
                    <RoughNotation
                      type="box"
                      show={isUserInfo}
                      color="#99ccd5"
                      padding={10}
                    >
                      Mi perfil
                    </RoughNotation>
                  </button>
                </li>
                <li className="relative">
                  <button
                    tabIndex={0}
                    onClick={() => setIsUserInfo(false)}
                    className={`${
                      !isUserInfo
                        ? "font-medium dark:text-white"
                        : "dark:hover:text-white"
                    }`}
                  >
                    <RoughNotation
                      type="box"
                      show={!isUserInfo}
                      color="#99ccd5"
                      padding={10}
                    >
                      Mis viajes
                    </RoughNotation>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <AnimatePresence mode="wait">
            {isUserInfo ? (
              <UserInfo key="userinfo" userData={userData} loading={loading} />
            ) : (
              <MyTrips key="mytrips" userTrips={userTrips} loading={loading} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
