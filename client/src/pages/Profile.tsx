import { useContext, useEffect, useState } from "react";
import { RoughNotation } from "react-rough-notation";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/SectionTitle";
import MyTrips from "../components/MyTrips";
import UserInfo from "../components/UserInfo";
import BackButton from "../components/BackButton";
import { Separator } from "../components/ui/separator";
import Loading from "../components/Loading";
import axios from "axios";

type ProfileProps = {
  isUserInfo: boolean;
  setIsUserInfo: (value: boolean) => void;
};

const INITIAL_STATES = {
  _id: "",
  addressCapital: "",
  addressCda: "",
  email: "",
  fullName: "",
  myTrips: [],
  phone: undefined,
  username: "",
};

const sectionVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
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

const Profile = ({ isUserInfo, setIsUserInfo }: ProfileProps) => {
  const [data, setData] = useState(INITIAL_STATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `https://travel-booking-api-production.up.railway.app/api/users/${user?._id}`,
          { headers }
        );
        setData(res.data.user);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="">
      <SectionTitle>Mi cuenta</SectionTitle>
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className=""
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center">
              <div className="self-start mb-2">
                <BackButton toProfile={false} />
              </div>
              <nav className="flex items-center justify-center">
                <ul className="flex items-center gap-5 px-5 py-2">
                  <li className="relative">
                    <button
                      tabIndex={0}
                      onClick={() => setIsUserInfo(true)}
                      className={`font-medium ${
                        isUserInfo ? "dark:text-white" : "dark:hover:text-white"
                      }`}
                    >
                      <RoughNotation
                        type="circle"
                        show={isUserInfo}
                        color="#f9b4b4"
                        padding={11}
                      >
                        Mi perfil
                      </RoughNotation>
                    </button>
                  </li>
                  <Separator orientation="vertical" className="h-5 w-[1px]" />
                  <li className="relative">
                    <button
                      tabIndex={0}
                      onClick={() => setIsUserInfo(false)}
                      className={`font-medium ${
                        !isUserInfo
                          ? "dark:text-white"
                          : "dark:hover:text-white"
                      }`}
                    >
                      <RoughNotation
                        type="circle"
                        show={!isUserInfo}
                        color="#f9b4b4"
                        padding={11}
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
                <UserInfo key="userinfo" userData={data} />
              ) : (
                <MyTrips
                  key="mytrips"
                  userData={data}
                  setIsUserInfo={setIsUserInfo}
                  userTrips={data.myTrips}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Profile;
