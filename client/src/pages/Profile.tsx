import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import UserInfo from "../components/UserInfo";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import axios from "axios";
import sectionVariants from "@/lib/variants/sectionVariants";
import { createAuthHeaders } from "@/lib/utils/createAuthHeaders";
import SectionTitle from "@/components/SectionTitle";

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

const Profile = () => {
  const [data, setData] = useState(INITIAL_STATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_ENDPOINT}/users/${
            user?._id
          }`,
          { headers: createAuthHeaders() }
        );
        setData(res.data.user);
      } catch (err) {
        console.log(err);
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="relative flex flex-col gap-5">
      <div className="self-start absolute left-0 top-[3px]">
        <BackButton linkTo="/viajes" />
      </div>
      <SectionTitle>Perfil</SectionTitle>
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="wait">
              <UserInfo key="userinfo" userData={data} />
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Profile;
