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
import { ClipboardList, User } from "lucide-react";

type ProfileProps = {
  isUserInfo: boolean;
  setIsUserInfo: (value: boolean) => void;
};

const INITIAL_STATES = {
  _id: "",
  username: "",
  fullName: "",
  addressCda: {
    street: "",
    streetNumber: undefined,
    crossStreets: "",
  },
  addressCapital: "",
  email: "",
  isReminder: false,
  myTrips: [],
  phone: undefined,
  dni: undefined,
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
          `https://fabebus-api-example.onrender.com/api/users/${user?._id}`,
          { headers }
        );
        setData(res.data.user);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  return (
    <section className="flex flex-col">
      <div className="self-start mt-4">
        <BackButton toProfile={false} />
      </div>
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
              <nav className="flex items-center justify-center">
                <ul className="flex items-center gap-7 px-5 py-2">
                  <li className="relative">
                    <button
                      tabIndex={0}
                      onClick={() => setIsUserInfo(true)}
                      className={`font-medium flex items-center gap-1 ${
                        isUserInfo ? "dark:text-white" : "dark:hover:text-white"
                      }`}
                    >
                      <User
                        className={`h-5 w-5 ${
                          isUserInfo ? "text-[#e7a7a7]" : "text-icon-color"
                        } dark:text-icon-color-dark`}
                      />
                      <RoughNotation
                        type="circle"
                        show={isUserInfo}
                        color="#f9b4b4"
                        padding={[8, 15, 8, 38]}
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
                      className={`font-medium flex items-center gap-1 ${
                        !isUserInfo
                          ? "dark:text-white"
                          : "dark:hover:text-white"
                      }`}
                    >
                      <ClipboardList
                        className={`h-5 w-5 ${
                          !isUserInfo ? "text-[#e7a7a7]" : "text-icon-color"
                        } dark:text-icon-color-dark`}
                      />
                      <RoughNotation
                        type="circle"
                        show={!isUserInfo}
                        color="#f9b4b4"
                        padding={[8, 15, 8, 38]}
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
