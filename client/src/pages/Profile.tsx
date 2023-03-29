import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/ui/SectionTitle";
import MyTrips from "../components/MyTrips";
import UserInfo from "../components/UserInfo";
import useFetch from "../hooks/useFetch";

type ProfileProps = {
  isUserInfo: boolean;
  setIsUserInfo: (value: boolean) => void;
};

const Profile = ({ isUserInfo, setIsUserInfo }: ProfileProps) => {
  const [userTrips, setUserTrips] = useState([]);
  const [userData, setUserData] = useState({});
  const { user } = useContext(AuthContext);

  const url = `http://localhost:8800/api/users/${user._id}`;

  const { data, loading, error } = useFetch(url);

  const navigate = useNavigate();

  useEffect(() => {
    setUserTrips(data.user?.myTrips);
    setUserData(data.user);
  }, [data, user]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <section className="section">
      <div className="">
        <SectionTitle>Mi cuenta</SectionTitle>
        <nav className="mx-auto flex items-center justify-center">
          <ul className="flex items-center gap-2 rounded-full px-3 py-2 border border-blue-lagoon-200 bg-white shadow-sm shadow-blue-lagoon-500/10 dark:bg-transparent dark:border-neutral-600">
            <li
              className={
                isUserInfo
                  ? "rounded-full shadow-sm px-4 py-1 border border-blue-lagoon-200 bg-blue-lagoon-300/10"
                  : "px-2"
              }
            >
              <button
                tabIndex={0}
                onClick={() => setIsUserInfo(true)}
                className={`text-sm ${
                  isUserInfo
                    ? "font-medium dark:text-white"
                    : "dark:hover:text-white"
                } md:text-base`}
              >
                Mi perfil
              </button>
            </li>
            <li
              className={
                !isUserInfo
                  ? "rounded-full shadow-sm px-4 py-1 border border-blue-lagoon-200 bg-blue-lagoon-300/10"
                  : "px-2"
              }
            >
              <button
                tabIndex={0}
                onClick={() => setIsUserInfo(false)}
                className={`text-sm ${
                  !isUserInfo
                    ? "font-medium dark:text-white"
                    : "dark:hover:text-white"
                } md:text-base`}
              >
                Mis viajes
              </button>
            </li>
          </ul>
        </nav>
        {isUserInfo ? (
          <UserInfo userData={userData} loading={loading} />
        ) : (
          <MyTrips userTrips={userTrips} loading={loading} />
        )}
      </div>
    </section>
  );
};

export default Profile;
