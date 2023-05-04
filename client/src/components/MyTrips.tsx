import { AlertCircle, DollarSign, CalendarDays, Clock } from "lucide-react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";
import axios from "axios";
import { toast } from "../hooks/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import miniBus from "../assets/minibus1-sm.png";
import moment from "moment-timezone";

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

type UserData = {
  _id: string;
  addressCapital: string;
  addressCda: string;
  email: string;
  fullName: string;
  image?: string;
  myTrips: TripProps[];
  phone: undefined | number;
  username: string;
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
  const [err, setErr] = useState<null | string>(null);
  const userId = userData._id;

  const navigate = useNavigate();

  const todayDate = moment().locale("es").format("ddd DD/MM");
  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (e: any) => {
    setLoading(true);
    const tripId = e.target.id;
    try {
      await axios.delete(
        `https://travel-booking-api-production.up.railway.app/api/passengers/${userId}/${tripId}`,
        { headers }
      );
      toast({
        description: "Lugar cancelado con éxito.",
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
        description: `Error al cancelar lugar, intente más tarde. ${
          err ? `"${err}"` : ""
        }`,
      });
    }
  };

  const formatDate = (date: string) => {
    moment.locale("es", {
      weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    });
    const momentDate = moment.utc(date);
    const timezone = "America/Argentina/Buenos_Aires";
    const timezone_date = momentDate.tz(timezone);
    const formatted_date = timezone_date.format("ddd DD/MM");
    // with more info: const formatted_date = timezone_date.format("ddd  DD/MM/YYYY HH:mm:ss [GMT]Z (z)");
    return formatted_date;
  };

  return (
    <section className="min-h-[70vh] w-full mx-auto mt-6 bg-transparent flex flex-col gap-5 items-center">
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          variants={tripVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full flex flex-col items-center gap-5 md:grid md:justify-items-center md:grid-cols-2"
        >
          {userTrips && userTrips.length > 0 ? (
            <>
              {userTrips.map((trip: TripProps) => (
                <article
                  key={trip.id}
                  className="w-full relative bg-white/40 border border-border-color rounded-md shadow-md mb-10 pb-2 max-w-[400px] dark:bg-black/40 dark:border-border-color-dark dark:hover:border-blue-lagoon-300"
                >
                  <div className="px-4 pt-9 pb-4">
                    <div className="flex flex-col gap-2">
                      <div className="absolute top-[.6rem] left-5">
                        <img
                          src={miniBus}
                          alt="combi"
                          className="w-10 h-9 lg:w-12 lg:h-11"
                        />
                      </div>
                      <div className="absolute right-4 top-2 flex items-center gap-2">
                        <p className="order-2 font-medium flex items-center select-none gap-1 rounded-2xl border border-blue-lagoon-300 bg-red-600/30 border-red-600/20 dark:bg-red-600/30 dark:border-blue-lagoon-300 dark:text-blue-lagoon-50 px-3 py-0.5">
                          <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
                          {formatDate(trip.date)}
                        </p>
                        {formatDate(trip.date) === todayDate && (
                          <p className="text-[#256840] select-none font-medium bg-green-600/30 rounded-2xl border border-green-500/40 dark:bg-[#6fe79f]/10 dark:border-[#50db88] dark:text-[#d7fce6] px-3 py-0.5">
                            HOY
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 mt-2 lg:mt-4">
                        <div className="flex items-center gap-4">
                          <h3 className="font-bold text-lg mt-2 dark:text-white lg:text-xl">
                            {trip.name}
                          </h3>
                        </div>
                        <div className="flex flex-col w-full bg-blue-lagoon-200/10 border border-border-color gap-2 p-4 shadow-inner rounded-md dark:bg-blue-lagoon-700/10 dark:border-border-color-dark">
                          <div className="flex flex-col gap-2">
                            <p className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-blue-lagoon-800" />
                              <span className="dark:text-white font-medium">
                                Salida:
                              </span>{" "}
                              {trip.departureTime}
                              <span>- {trip.from}</span>
                            </p>
                            {trip.arrivalTime && (
                              <div className="flex items-center gap-1">
                                <p className="flex items-center gap-1">
                                  <Clock className="w-4 h-4 text-blue-lagoon-800" />
                                  <span className="dark:text-white font-medium">
                                    Llegada:
                                  </span>{" "}
                                  {trip.arrivalTime}
                                  <span>- {trip.to}</span>
                                </p>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button className="">
                                        <AlertCircle className="h-4 w-4 text-yellow-300" />
                                        <span className="sr-only">
                                          Alert Circle
                                        </span>
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="">
                                      <p className="">
                                        El horario de llegada estimado es
                                        aproximado y puede variar
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            )}
                            <p className="flex items-center gap-1">
                              <DollarSign className="text-blue-lagoon-900 dark:text-blue-lagoon-800 h-4 w-4" />
                              <span className="dark:text-white font-medium">
                                Precio:{" "}
                              </span>
                              ${trip.price}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="self-center flex items-center justify-between mt-3">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button type="button" className="text-red-600">
                              Cancelar viaje
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Estás seguro?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no podrá deshacerse. Esto eliminará
                                permanentemente tu lugar en el viaje.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex flex-col-reverse gap-1 md:flex-row md:justify-end">
                              <AlertDialogCancel className="md:w-auto" asChild>
                                <Button className="">
                                  No, volver a mis viajes
                                </Button>
                              </AlertDialogCancel>
                              <AlertDialogAction
                                id={trip.id}
                                onClick={handleDelete}
                                className="md:w-auto"
                              >
                                Si, cancelar mi lugar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </article>
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
      )}
    </section>
  );
};

export default MyTrips;
