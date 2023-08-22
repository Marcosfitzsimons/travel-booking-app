import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import MyTripCard from "./MyTripCard";
import { Button } from "./ui/button";
import { useToast } from "./../components/ui/use-toast";
import { CheckCircle } from "lucide-react";
import tripVariants from "@/lib/variants/tripVariants";
import { TripProps } from "@/types/props";
import { createAuthHeaders } from "@/lib/utils/createAuthHeaders";
import { AuthContext } from "@/context/AuthContext";
import SectionTitle from "./SectionTitle";
import BackButton from "./BackButton";
import CardSkeleton from "./skeletons/CardSkeleton";
import { Skeleton } from "./ui/skeleton";

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState<TripProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const { toast } = useToast();

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const handleDelete = async (e: any) => {
    setLoading(true);
    const tripId = e.target.id;
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_API_BASE_ENDPOINT
        }/passengers/${userId}/${tripId}`,
        { headers: createAuthHeaders() }
      );
      toast({
        description: (
          <div className="flex items-center gap-1">
            {<CheckCircle className="w-[15px] h-[15px]" />} Lugar cancelado con
            éxito.
          </div>
        ),
      });
      setUserTrips(userTrips.filter((trip) => trip._id !== tripId));
      setLoading(false);
      setTimeout(() => {
        navigate("/viajes");
      }, 100);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_BASE_ENDPOINT
          }/users/trips/${userId}`,
          { headers: createAuthHeaders() }
        );
        setUserTrips(res.data.userTrips);
      } catch (err) {
        console.log(err);
        setErr(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section
      className={`min-h-[70vh] w-full mx-auto bg-transparent flex flex-col items-center gap-3`}
    >
      <div className="w-full flex items-end text-sm justify-between">
        <div className="relative w-full flex items-center justify-center">
          <div className="absolute left-0">
            <BackButton linkTo="/viajes" />
          </div>
          <SectionTitle>Mis viajes</SectionTitle>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 my-3">
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

      {loading ? (
        <div className="w-full flex flex-col items-center">
          <Skeleton className="w-32 h-6 self-end mb-4" />
          <div className="w-full">
            <CardSkeleton cards={1} />
          </div>
        </div>
      ) : (
        <>
          {userTrips && userTrips.length > 0 && (
            <p className="flex items-center gap-[3px] self-end text-sm mb-4">
              Tenes
              <span className="font-medium text-accent">
                {userTrips && userTrips.length}
              </span>
              viaje
              {userTrips.length > 1 && "s"} reservado
              {userTrips.length > 1 && "s"}
            </p>
          )}
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
                    key={trip._id}
                    handleDelete={handleDelete}
                  />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 mt-3 md:col-start-1 md:col-end-3">
                <p>No tenes lugares reservados</p>
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
