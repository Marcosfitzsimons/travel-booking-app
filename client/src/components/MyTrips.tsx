import { Heart, X, ClipboardList, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { Separator } from "./ui/separator";
import MyTripCard from "./MyTripCard";
import { Button } from "./ui/button";
import { useToast } from "./../components/ui/use-toast";
import { CheckCircle } from "lucide-react";

type TripProps = {
  id: string;
  name: string;
  date: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  maxCapacity: number;
  price: number;
  available: boolean;
};

type addressCda = {
  street: string;
  streetNumber: number | undefined;
  crossStreets: string;
};

type UserData = {
  _id: string;
  fullName: string;
  username: string;
  addressCda: addressCda;
  addressCapital: string;
  dni: number | undefined;
  phone: undefined | number;
  email: string;
  image?: string;
  myTrips: TripProps[];
};
interface myTripsProps {
  userTrips: TripProps[];
  userData: UserData;
  setIsUserInfo: (value: boolean) => void;
}

const tripVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    y: 0,
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

const MyTrips = ({ userTrips, userData, setIsUserInfo }: myTripsProps) => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [err, setErr] = useState<null | string>(null);

  const { toast } = useToast();

  const userId = userData._id;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (e: any) => {
    setLoading(true);
    const tripId = e.target.id;
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_API_BASE_ENDPOINT
        }/passengers/${userId}/${tripId}`,
        { headers }
      );
      toast({
        description: (
          <div className="flex items-center gap-1">
            {<CheckCircle className="w-[15px] h-[15px]" />} Lugar cancelado con
            éxito.
          </div>
        ),
      });
      setLoading(false);
      setIsUserInfo(false);
      navigate("/viajes");
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      setErr(err.message);
      toast({
        variant: "destructive",
        title: "Error al cancelar su lugar",
        description: err.response.data.msg
          ? err.response.data.msg
          : "Error al cancelar lugar, intente más tarde.",
      });
    }
  };
  console.log(userData);

  return (
    <section className="min-h-[70vh] w-full mx-auto mt-3 bg-transparent flex flex-col gap-5 items-center">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="">
            {userTrips && userTrips.length > 0 ? (
              <div className="flex flex-col items-center gap-3">
                <p className="flex items-center gap-1 ">
                  <Heart
                    className="w-4 h-4 relative top-[1px] dark:text-black"
                    fill="red"
                  />
                  Gracias por viajar con nosotros
                  <Heart
                    className="w-4 h-4 relative top-[1px] dark:text-black"
                    fill="red"
                  />
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <Separator className="w-4" />
          <div className="w-full flex items-end text-sm mb-4 justify-between">
            <h4 className="flex items-center gap-1 font-medium text-xl dark:text-white self-start lg:text-2xl">
              <ClipboardList className="h-5 w-5 text-accent lg:w-6 lg:h-6" />
              Mis viajes:
            </h4>
            {userTrips && userTrips.length > 0 && (
              <p className="flex items-center gap-[3px]">
                Tenes
                <span className="font-medium text-accent">
                  {userTrips && userTrips.length}
                </span>
                viaje
                {userTrips.length > 1 && "s"} reservado
                {userTrips.length > 1 && "s"}
              </p>
            )}
          </div>
          <motion.div
            variants={tripVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col items-center gap-10 md:grid md:justify-items-center md:grid-cols-2"
          >
            {userTrips && userTrips.length > 0 ? (
              <>
                {userTrips.map((trip: TripProps) => (
                  <MyTripCard
                    {...trip}
                    key={trip.id}
                    handleDelete={handleDelete}
                  />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 md:col-start-1 md:col-end-3">
                <p>No tenes lugares reservados.</p>
                <div
                  className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 h-8"
                  onClick={() => navigate("/viajes")}
                >
                  <Button className="relative bg-[#9e4a4f] text-slate-100  hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#9e4a4f] h-8">
                    Reservar ahora
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </section>
  );
};

export default MyTrips;
