import { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/ui/SectionTitle";
import MyTrips from "../components/MyTrips";
import UserInfo from "../components/UserInfo";

type ProfileProps = {
  isUserInfo: boolean;
  setIsUserInfo: (value: boolean) => void;
};

const Profile = ({ isUserInfo, setIsUserInfo }: ProfileProps) => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <section className="section">
      <div className="">
        <SectionTitle>Mi cuenta</SectionTitle>
        <nav className="mx-auto flex items-center justify-center">
          <ul className="flex items-center gap-2 rounded-xl px-3 py-2 border border-slate-400 bg-white/10 shadow-sm dark:bg-[#353535]/80 dark:border-neutral-500">
            <li
              className={
                isUserInfo
                  ? "rounded-md shadow-sm px-3 py-1 bg-white dark:bg-neutral-900/70"
                  : "px-2"
              }
            >
              <button
                tabIndex={0}
                onClick={() => setIsUserInfo(true)}
                className={`text-sm ${
                  isUserInfo
                    ? "text-black font-medium dark:text-white"
                    : "text-slate-600 dark:text-neutral-200 dark:hover:text-white"
                } md:text-base`}
              >
                Mi perfil
              </button>
            </li>
            <li
              className={
                !isUserInfo
                  ? "rounded-md shadow-sm px-3 py-1 bg-white dark:bg-neutral-900/70"
                  : "px-2"
              }
            >
              <button
                tabIndex={0}
                onClick={() => setIsUserInfo(false)}
                className={`text-sm ${
                  !isUserInfo
                    ? "text-black font-medium dark:text-white"
                    : "text-slate-600 dark:text-neutral-200 dark:hover:text-white"
                } md:text-base`}
              >
                Mis viajes
              </button>
            </li>
          </ul>
        </nav>
        {isUserInfo ? <UserInfo /> : <MyTrips />}
      </div>
    </section>
  );
};

export default Profile;
