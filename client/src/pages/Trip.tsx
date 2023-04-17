import axios from "axios";
import { motion } from "framer-motion";
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
import moment from "moment-timezone";
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://travel-booking-api-production.up.railway.app/api/trips/${tripId}`
        );
        const momentDate = moment.utc(res.data.date).add(1, "day").toDate();
        const newDate = moment.tz(momentDate, "America/Argentina/Buenos_Aires");
        const formattedDate = moment(newDate).format("DD/MM/YY");
        setData({ ...res.data, date: formattedDate });
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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
          <article className="w-full relative mx-auto bg-white/80 rounded-md border border-blue-lagoon-500/20 shadow-md mb-10 pb-2 max-w-md dark:bg-black dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300">
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
                  <p className="font-medium flex items-center select-none gap-1 px-2 rounded-2xl bg-blue-lagoon-300/10 shadow-sm border border-blue-lagoon-200 dark:bg-blue-lagoon-900/70 dark:border-blue-lagoon-400 dark:text-white">
                    <CalendarDays className="w-5 h-5" /> {data.date}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-4 lg:mt-7">
                  <div className="flex items-center gap-4">
                    <h3 className="font-bold text-lg l dark:text-white lg:text-xl">
                      {data.name}
                    </h3>
                  </div>
                  <div className="flex flex-col w-full bg-blue-lagoon-300/10 gap-2 border border-blue-lagoon-700/50 p-4 shadow-inner rounded-md dark:bg-blue-lagoon-700/10 dark:border-blue-lagoon-300">
                    <div className="flex flex-col gap-2">
                      <p className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-lagoon-800 dark:text-white" />
                        <span className="dark:text-white font-medium">
                          Salida:
                        </span>{" "}
                        {data.departureTime}
                        <span>- {data.from}</span>
                      </p>
                      {data.arrivalTime && (
                        <div className=" flex items-center gap-1">
                          <p className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-blue-lagoon-800 dark:text-white" />
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
                        <DollarSign className="w-4 h-4 text-blue-lagoon-800 dark:text-white" />
                        <span className="dark:text-white font-medium">
                          Precio:{" "}
                        </span>
                        ${data.price}
                      </p>
                      <div className="flex flex-col gap-1 px-2 py-1 rounded-md border border-blue-lagoon-200 bg-blue-lagoon-300/10">
                        <h4 className="font-medium text-blue-lagoon-800 dark:text-white">
                          Mis datos:
                        </h4>
                        <ul>
                          <li>
                            <p className="flex items-center gap-[2px] text-sm">
                              <MapPin className="w-4 h-4 text-blue-lagoon-800 dark:text-white" />
                              <span className="font-medium text-blue-lagoon-800 dark:text-white">
                                Dirreción (Carmen):
                              </span>{" "}
                              {user && user.addressCda}
                            </p>
                          </li>
                          <li>
                            <p className="flex items-center gap-[2px] text-sm">
                              <MapPin className="w-4 h-4 text-blue-lagoon-800 dark:text-white" />
                              <span className="font-medium text-blue-lagoon-800 dark:text-white">
                                Dirreción (Capital):
                              </span>{" "}
                              {user && user.addressCapital}
                            </p>
                          </li>
                        </ul>
                        <Button
                          onClick={() => navigate("/mi-perfil/editar-perfil")}
                          className="mt-1 h-7 border border-blue-lagoon-200 bg-white/50 hover:bg-white dark:bg-black/40 dark:hover:text-white"
                        >
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => navigate("/viajes")}
                    className="text-red-600"
                  >
                    Cancelar
                  </button>
                  <div className="">
                    <div
                      className="w-[min(30rem,100%)] h-8 relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 "
                      onClick={handleOnConfirm}
                    >
                      <Button className="relative w-full h-8 bg-blue-lagoon-500 text-slate-100  hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-blue-lagoon-500 ">
                        Confirmar
                      </Button>
                    </div>
                  </div>
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
