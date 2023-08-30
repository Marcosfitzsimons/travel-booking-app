import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UserInfo from "../components/UserInfo";
import BackButton from "../components/BackButton";
import sectionVariants from "@/lib/variants/sectionVariants";
import SectionTitle from "@/components/SectionTitle";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

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

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const user = auth?.user;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get(`/users/${user?._id}`);
        setData(res.data.user);
        setLoading(false);
      } catch (err: any) {
        if (err.response?.status === 403) {
          setAuth({ user: null });
          setTimeout(() => {
            navigate("/login");
          }, 100);
        }
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <div className="relative w-full flex items-center justify-center">
        <div className="absolute left-0">
          <BackButton linkTo="/viajes" />
        </div>
        <SectionTitle>Perfil</SectionTitle>
      </div>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <UserInfo userData={data} />
        </motion.div>
      )}
    </section>
  );
};

export default Profile;
