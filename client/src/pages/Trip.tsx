import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/SectionTitle";
import { AlertCircle, CalendarDays, MapPin, Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Button } from "../components/ui/button";
import { toast } from "../hooks/ui/use-toast";
import Loading from "../components/Loading";
import miniBus from "../assets/minibus1-sm.png";
import { DollarSign } from "lucide-react";

type ProfileProps = {
  setIsUserInfo: (value: boolean) => void;
};

const INITIAL_VALUES = {
  name: "",
  date: "",
  from: "",
  to: "",
  departureTime: "",
  arrivalTime: "",
  price: "",
  image: "",
  maxCapacity: "",
};

const sectionVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
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

const Trip = ({ setIsUserInfo }: ProfileProps) => {
  const [data, setData] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);
  const location = useLocation();
  const path = location.pathname;
  const tripId = path.split("/")[2];
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const todayDate = moment().locale("es").format("ddd DD/MM");
  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleOnConfirm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://travel-booking-api-production.up.railway.app/api/passengers/${user?._id}/${tripId}`,
        {},
        { headers }
      );

      toast({
        description: "Lugar guardado con éxito.",
      });
      setLoading(false);
      setIsUserInfo(false);
      navigate("/mi-perfil");
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      toast({
        variant: "destructive",
        description: err.response.data.msg
          ? err.response.data.msg
          : "Error al guardar lugar, intente más tarde.",
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://travel-booking-api-production.up.railway.app/api/trips/${tripId}`
        );

        setData({ ...res.data });
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="section">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col gap-10"
      >
        <SectionTitle>Confirmar lugar</SectionTitle>
        {loading ? (
          <Loading />
        ) : (
          <article className="w-full relative mx-auto bg-white/40 rounded-md border border-border-color shadow-md max-w-md dark:bg-black/40 dark:border-border-color-dark">
            <div className="px-4 pt-9 pb-4">
              <div className="flex flex-col gap-2">
                <div className="absolute top-[.6rem] left-5">
                  <img
                    src={miniBus}
                    alt="combi"
                    className="w-10 h-9 lg:w-12 lg:h-11 hover:-rotate-12 transition-transform"
                  />
                </div>
                <div className="absolute right-[22px] top-2 flex items-center gap-2">
                  <p className="text-teal-900 order-2 font-medium flex items-center select-none gap-1 rounded-2xl border border-teal-800/80 bg-teal-300/30 dark:bg-teal-800  dark:border-teal-400/80 dark:text-white px-3 py-0.5">
                    <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
                    {formatDate(data.date)}
                  </p>
                  {formatDate(data.date) === todayDate && (
                    <p className="text-green-900 bg-green-300/30 border border-green-800/80 order-1 select-none font-medium rounded-2xl dark:bg-[#75f5a8]/30 dark:border-[#4ca770] dark:text-white px-3 py-0.5">
                      HOY
                    </p>
                  )}
                </div>

                <div className="px-2 flex flex-col gap-3 mt-4 lg:mt-7">
                  <div className="flex items-center gap-4">
                    <h3 className="font-bold text-lg dark:text-white lg:text-xl">
                      {data.name}
                    </h3>
                  </div>
                  <div className="flex flex-col w-full bg-blue-lagoon-200/10 gap-2 border border-border-color p-4 shadow-inner rounded-md dark:bg-blue-lagoon-700/10 dark:border-border-color-dark">
                    <div className="flex flex-col gap-2">
                      <p className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-lagoon-900 dark:text-blue-lagoon-800" />
                        <span className="dark:text-white font-medium">
                          Salida:
                        </span>{" "}
                        {data.departureTime}
                        <span>- {data.from}</span>
                      </p>
                      {data.arrivalTime && (
                        <div className=" flex items-center gap-1">
                          <p className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-blue-lagoon-900 dark:text-blue-lagoon-800" />
                            <span className="dark:text-white font-medium">
                              Llegada:
                            </span>{" "}
                            {data.arrivalTime}
                            <span>- {data.to}</span>
                          </p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="">
                                  <AlertCircle className="h-4 w-4 text-yellow-300" />
                                  <span className="sr-only">Alert Circle</span>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  El horario de llegada estimado es aproximado y
                                  puede variar
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                      <p className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-blue-lagoon-900 dark:text-blue-lagoon-800" />
                        <span className="dark:text-white font-medium">
                          Precio:{" "}
                        </span>
                        ${data.price}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border-color mt-2 flex flex-col gap-1 p-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium dark:text-white">
                      Mis datos para este viaje:
                    </h4>
                    <Button
                      onClick={() => navigate("/mi-perfil/editar-perfil")}
                      className="h-7 border border-blue-lagoon-200 bg-white/50 hover:bg-white dark:bg-black/40 dark:hover:text-white"
                    >
                      Editar
                    </Button>
                  </div>
                  <ul>
                    <li>
                      <p className="flex items-center gap-[2px] text-sm">
                        <MapPin className="w-4 h-4 text-blue-lagoon-900 dark:text-blue-lagoon-800" />
                        <span className="font-medium dark:text-white">
                          Dirreción (Carmen):
                        </span>{" "}
                        {user && user.addressCda}
                      </p>
                    </li>
                    <li>
                      <p className="flex items-center gap-[2px] text-sm">
                        <MapPin className="w-4 h-4 text-blue-lagoon-900 dark:text-blue-lagoon-800" />
                        <span className="font-medium dark:text-white">
                          Dirreción (Capital):
                        </span>{" "}
                        {user && user.addressCapital}
                      </p>
                    </li>
                  </ul>
                </div>
                <div
                  className="self-end relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 lg:mx-2 lg:h-8 lg:w-auto"
                  onClick={handleOnConfirm}
                >
                  <Button className="relative w-full bg-[#9e4a4f] text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#9e4a4f] lg:h-8 lg:w-auto">
                    Confirmar
                  </Button>
                </div>
              </div>
            </div>
          </article>
        )}
      </motion.div>
    </section>
  );
};

export default Trip;
