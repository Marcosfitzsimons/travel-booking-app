import { Check, Heart, Loader2, Meh, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTripCard from "./MyTripCard";
import { Button } from "./ui/button";
import { useToast } from "./../components/ui/use-toast";
import tripVariants from "@/lib/variants/tripVariants";
import { TripProps } from "@/types/props";
import SectionTitle from "./SectionTitle";
import BackButton from "./BackButton";
import CardSkeleton from "./skeletons/CardSkeleton";
import { Skeleton } from "./ui/skeleton";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import Error from "./Error";

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState<TripProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const { toast } = useToast();

  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const userId = auth?.user?._id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get(`/users/trips/${userId}`);
        setUserTrips(res.data.userTrips);
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
        setLoading(false);
        setErr(true);
      }
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

      {userTrips && userTrips.length > 0 && (
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
      )}

      {loading ? (
        <div className="w-full flex flex-col items-center">
          <Skeleton className="w-32 h-6 self-end mb-4" />
          <div className="w-full">
            <CardSkeleton cards={1} />
          </div>
        </div>
      ) : err ? (
        <Error />
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
                    userTrips={userTrips}
                    {...trip}
                    key={trip._id}
                    setUserTrips={setUserTrips}
                  />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 mt-3 md:col-start-1 md:col-end-3">
                <p className="flex items-center gap-1">
                  No tenes viajes reservados
                  <Meh className="shrink-0 w-5 h-5 text-accent" />
                </p>
                <div
                  className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white"
                  onClick={() => navigate("/viajes")}
                >
                  <Button className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white">
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
