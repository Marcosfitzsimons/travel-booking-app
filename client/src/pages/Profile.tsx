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

const Profile = ({ isUserInfo, setIsUserInfo }: ProfileProps) => {
  const [data, setData] = useState(INITIAL_STATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  console.log("userprofile re-render");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `http://localhost:8800/api/users/${user?._id}`,
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

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

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
              <div className="self-start my-4 mb-6">
                <BackButton toProfile={false} />
              </div>
              <nav className="flex items-center justify-center">
                <ul className="flex items-center gap-4 px-5 py-2 rounded-lg bg-white shadow-sm shadow-blue-lagoon-900/30 border border-blue-lagoon-200 hover:border-blue-lagoon-600/50 dark:text-blue-lagoon-100  dark:bg-black dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300/80">
                  <li className="relative">
                    <button
                      tabIndex={0}
                      onClick={() => setIsUserInfo(true)}
                      className={`font-medium ${
                        isUserInfo ? "dark:text-white" : "dark:hover:text-white"
                      }`}
                    >
                      <RoughNotation
                        type="underline"
                        show={isUserInfo}
                        color="#99ccd5"
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
                        type="underline"
                        show={!isUserInfo}
                        color="#99ccd5"
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
