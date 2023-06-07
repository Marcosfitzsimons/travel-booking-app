import {
  AlertCircle,
  DollarSign,
  CalendarDays,
  Clock,
  Heart,
  Bell,
  X,
  ClipboardList,
  Check,
  FileCheck,
  MapPin,
} from "lucide-react";
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
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
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
  isReminder: boolean;
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [err, setErr] = useState<null | string>(null);
  const [reminder, setReminder] = useState(userData.isReminder);
  const [isUnsaved, setIsUnsaved] = useState(false);

  const userId = userData._id;
  console.log(userData);
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
        `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
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

  const handleCheckedChange = () => {
    setReminder((prev) => !prev);
    setIsUnsaved(true);
  };

  const handleIsReminder = async () => {
    setIsSubmitted(true);
    try {
      const res = await axios.put(
        `https://fabebus-api-example.onrender.com/api/users/${userData._id}`,
        { userData: { isReminder: reminder } },
        { headers }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      setIsSubmitted(false);
      setIsUnsaved(false);
      toast({
        description: "Cambios guardados con éxito.",
      });
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setIsSubmitted(false);
      setErr(errorMsg);
      toast({
        variant: "destructive",
        description: "Error al guardar los cambios, intentar mas tarde.",
      });
    }
  };

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

                <div className="w-full relative flex flex-col gap-3 p-4 rounded-md bg-white border border-yellow-300/80 dark:border-yellow-200/80 dark:bg-black/80">
                  <Label htmlFor="airplane-mode dark:text-white">
                    🔔 Activar recordatorio previo al viaje
                  </Label>

                  <div className="flex items-center gap-1">
                    <Switch
                      id="airplane-mode"
                      checked={reminder}
                      onCheckedChange={handleCheckedChange}
                      className={
                        reminder ? "bg-[#5FC488] dark:bg-[#6cd395]" : ""
                      }
                    />
                    {reminder ? (
                      <span className="text-xs flex items-center gap-[3px]">
                        Recordatorio activado{" "}
                        <Check className="w-4 h-4 relative top-[1px] text-green-600 lg:w-5 lg:h-5" />
                      </span>
                    ) : (
                      <span className="text-xs flex items-center gap-[3px]">
                        Recordatorio desactivado{" "}
                        <X className="w-4 h-4 relative top-[1.2px] text-red-600 lg:w-5 lg:h-5" />
                      </span>
                    )}
                  </div>
                  {isUnsaved ? (
                    <div className="w-auto flex flex-col items-center gap-2">
                      <Separator orientation="horizontal" className="w-8" />
                      <Button
                        onClick={handleIsReminder}
                        disabled={isSubmitted}
                        className="text-sm mt-1 h-7 border border-blue-lagoon-700/50 text-blue-lagoon-100 shadow-blue-lagoon-900/30 bg-gradient-to-r from-[#ac4e54] via-[#91474d] to-[#a84a50] bg-[length:100%] bg-left transition hover:text-white dark:text-blue-lagoon-100 dark:hover:text-white"
                      >
                        Guardar cambios
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <Separator className="w-16" />
          <h4 className="flex items-center gap-1 font-medium text-xl dark:text-white self-start lg:text-2xl">
            <ClipboardList className="h-5 w-5 text-icon-color dark:text-icon-color-dark lg:w-6 lg:h-6" />
            Mis viajes:
          </h4>
          <motion.div
            variants={tripVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col items-center gap-3 md:gap-5 md:grid md:justify-items-center md:grid-cols-2"
          >
            {userTrips && userTrips.length > 0 ? (
              <>
                {userTrips.map((trip: TripProps) => (
                  <article
                    key={trip.id}
                    className="w-full flex justify-center items-center relative mx-auto rounded-md shadow-md pb-5 max-w-[400px] bg-white/40 border dark:border-zinc-500 dark:bg-black/60"
                  >
                    <div className="w-full px-2 pt-9 sm:px-4">
                      <div className="flex flex-col gap-2">
                        <div className="absolute top-[.45rem] left-1 sm:left-3">
                          <img
                            src={miniBus}
                            alt="combi"
                            className="w-10 h-9 lg:w-12 lg:h-11 hover:-rotate-12 transition-transform"
                          />
                        </div>
                        <div className="absolute right-2 top-2 flex items-center gap-2 sm:right-4">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  disabled={!reminder}
                                  className="w-8 h-8 p-0 cursor-default bg-yellow-200/50 text-yellow-900/80 border border-yellow-900/60 dark:border-yellow-200/70 dark:text-yellow-200/90"
                                >
                                  <Bell className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="w-42">
                                <p className="text-xs flex items-center gap-[3px]">
                                  Recordatorio activado{" "}
                                  <Check className="w-4 h-4 relative top-[1px] text-green-600 " />
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <Separator orientation="vertical" className="h-4" />
                          <p className="text-teal-900 order-2 font-medium flex items-center select-none gap-1 rounded-lg border border-slate-800/60 bg-slate-200/30 dark:bg-slate-800/70 dark:border-slate-200/80 dark:text-white px-3">
                            <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
                            {formatDate(trip.date)}
                          </p>
                          {formatDate(trip.date) === todayDate && (
                            <p className="text-green-900 bg-green-300/30 border border-green-800/80 order-1 select-none font-medium rounded-lg dark:bg-[#75f5a8]/20 dark:border-[#86dda9] dark:text-white px-3 py-0">
                              HOY
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-1 mt-6 lg:mt-8">
                          <div className="flex flex-col sm:gap-2">
                            <h3 className="font-bold text-lg lg:text-xl">
                              {trip.name}
                            </h3>
                            <h4 className="text-sm font-light">
                              Información acerca del viaje:
                            </h4>
                          </div>
                          <div className="flex flex-col w-full bg-blue-lagoon-200/10 border border-border-color gap-2 py-3 px-1 shadow-inner rounded-md dark:bg-blue-lagoon-700/10 dark:border-border-color-dark">
                            <div className="flex flex-col gap-2 overflow-auto">
                              <p className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-icon-color shrink-0 dark:text-icon-color-dark" />
                                <span className="dark:text-white font-medium">
                                  Salida:
                                </span>{" "}
                                <span className="shrink-0">{trip.from}</span>
                                <Separator className="w-2 bg-border-color dark:bg-border-color-dark" />
                                <Clock className="h-4 w-4 text-icon-color shrink-0 dark:text-icon-color-dark" />
                                <span className="shrink-0">
                                  {trip.departureTime} hs.
                                </span>
                              </p>
                              <p className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-icon-color shrink-0 dark:text-icon-color-dark" />
                                <span className="dark:text-white font-medium">
                                  Destino:
                                </span>{" "}
                                <span className="shrink-0">{trip.to}</span>
                                <Separator className="w-2 bg-border-color dark:bg-border-color-dark" />
                                <Clock className="h-4 w-4 text-icon-color shrink-0 dark:text-icon-color-dark" />
                                <span className="shrink-0">
                                  {trip.arrivalTime} hs.
                                </span>
                              </p>
                              <p className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4 text-icon-color dark:text-icon-color-dark" />
                                <span className="dark:text-white font-medium">
                                  Precio:
                                </span>
                                <span className="">${trip.price}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="self-center flex items-center justify-between mt-3">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button type="button" className="text-red-700">
                                Cancelar viaje
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  ¿Estás seguro?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no podrá deshacerse. Esto
                                  eliminará permanentemente tu lugar en el
                                  viaje.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex flex-col-reverse gap-1 md:flex-row md:justify-end">
                                <AlertDialogCancel
                                  className="md:w-auto"
                                  asChild
                                >
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
          <Separator className="w-16" />
        </>
      )}
    </section>
  );
};

export default MyTrips;
