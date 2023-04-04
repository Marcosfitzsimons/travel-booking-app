import { AlertCircle, CalendarDays, Ticket, Watch } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
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
import DefaultButton from "./DefaultButton";

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
      const { data } = await axios.delete(
        `http://localhost:8800/api/passengers/${userId}/${tripId}`,
        { headers }
      );

      console.log(data);
      toast({
        description: "Lugar cancelado con éxito.",
      });
      setLoading(false);
      setIsUserInfo(false);
      navigate("/viajes");
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      toast({
        variant: "destructive",
        description: err.response.data.msg
          ? err.response.data.msg
          : "Error al cancelar lugar, intente más tarde.",
      });
    }
  };

  console.log(userTrips);
  return (
    <section className="w-full mx-auto mt-6  bg-transparent flex flex-col gap-5 items-center">
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          variants={tripVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full flex flex-col"
        >
          {userTrips && userTrips.length > 0 ? (
            <>
              {userTrips.map((trip: TripProps) => (
                <article
                  key={trip.id}
                  className="w-full relative bg-white/80 border border-blue-lagoon-500/20 rounded-md shadow-md mb-10 pb-2 max-w-md  dark:bg-black dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300"
                >
                  <div className="px-4 pt-9 pb-4">
                    <div className="flex flex-col gap-2">
                      <div className="absolute top-[.6rem] left-5">
                        <img
                          src="./minibus1-sm.png"
                          alt="combi"
                          className="w-10 h-9 lg:w-12 lg:h-11"
                        />
                      </div>
                      <div className="absolute right-4 top-2 flex items-center gap-2">
                        <p className="font-medium flex items-center select-none gap-1 px-2 rounded-2xl bg-blue-lagoon-300/10 shadow-sm border border-blue-lagoon-200 dark:bg-blue-lagoon-900/70 dark:border-blue-lagoon-400 dark:text-white">
                          <CalendarDays className="w-5 h-5" />{" "}
                          {format(new Date(trip.date), "dd/MM/yy")}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 mt-2  lg:mt-4">
                        <div className="flex items-center gap-4">
                          <h3 className="font-bold text-lg mt-2 dark:text-white lg:text-xl">
                            {trip.name}
                          </h3>
                        </div>
                        <div className="flex flex-col w-full bg-blue-lagoon-300/10 gap-2 border border-blue-lagoon-700/50 p-4 shadow-inner rounded-md dark:bg-blue-lagoon-700/10 dark:border-blue-lagoon-300">
                          <div className="flex flex-col gap-2">
                            <p className="flex items-center gap-1">
                              <Watch className="w-5 h-5 text-blue-lagoon-800 dark:text-white" />
                              <span className="dark:text-white font-medium">
                                Salida:
                              </span>{" "}
                              {trip.departureTime}
                              <span>- {trip.from}</span>
                            </p>
                            {trip.arrivalTime && (
                              <div className=" flex items-center gap-1">
                                <p className="flex items-center gap-1">
                                  <Watch className="w-5 h-5 text-blue-lagoon-800 dark:text-white" />
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
                                    <TooltipContent>
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
                              <Ticket className="w-5 h-5 text-blue-lagoon-800 dark:text-white" />
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
                                ¿Estás seguro? Perderás tu lugar en el viaje.
                              </AlertDialogTitle>
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
            <p className="mx-auto mb-[20rem] lg:mb-[28rem]">
              No tenes lugares reservados.
            </p>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default MyTrips;
