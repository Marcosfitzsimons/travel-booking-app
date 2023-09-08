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
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Error from "@/components/Error";

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
  const { toast } = useToast();

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
        const errorMsg = err.response?.data?.msg;
        toast({
          variant: "destructive",
          title: (
            <div className="flex gap-1">
              {<X className="h-5 w-5 text-destructive shrink-0" />}Error al
              cargar información
            </div>
          ) as any,
          description: errorMsg
            ? errorMsg
            : "Ha ocurrido un error al cargar información. Por favor, intentar más tarde",
        });
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
      ) : error ? (
        <Error />
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
