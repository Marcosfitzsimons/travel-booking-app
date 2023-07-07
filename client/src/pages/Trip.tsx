import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/SectionTitle";
import {
  CalendarDays,
  MapPin,
  Clock,
  Milestone,
  Crop,
  User,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { toast } from "../hooks/ui/use-toast";
import Loading from "../components/Loading";
import miniBus from "../assets/minibus1-sm.png";
import { DollarSign } from "lucide-react";
import BackButton from "../components/BackButton";
import { Separator } from "../components/ui/separator";

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
      await axios.post(
        `https://fabebus-api-example.onrender.com/api/passengers/${user?._id}/${tripId}`,
        {
          userId: user?._id,
        },
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
          `https://fabebus-api-example.onrender.com/api/trips/${tripId}`
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
        className="flex flex-col gap-3"
      >
        <div className="self-start mt-4">
          <BackButton toProfile={false} />
        </div>
        <SectionTitle>Confirmar lugar</SectionTitle>

        {loading ? (
          <Loading />
        ) : (
          <article className="w-full flex justify-center items-center relative mx-auto rounded-md shadow-input border pb-4 max-w-[400px] bg-card dark:shadow-none">
            <div className="w-full px-2 pt-9 pb-4 sm:px-4">
              <div className="flex flex-col gap-2 ">
                <div className="absolute top-[0.75rem] left-2.5 sm:left-3 flex flex-col gap-[3px] transition-transform ">
                  <span className="w-8 h-[4px] bg-black/60 rounded-full dark:bg-white" />
                  <span className="w-4 h-[4px] bg-black/60 rounded-full dark:bg-white" />
                  <span className="w-2 h-[4px] bg-black/60 rounded-full dark:bg-white" />
                </div>

                <div className="absolute right-2 top-2 flex items-center gap-2 sm:right-4">
                  <p className="text-teal-900 order-2 font-medium flex items-center shadow-input select-none gap-1 rounded-lg border border-slate-800/60 bg-slate-200/30 px-3 dark:bg-slate-800/70 dark:border-slate-200/80 dark:text-white dark:shadow-none">
                    <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
                    {formatDate(data.date)}
                  </p>
                  {formatDate(data.date) === todayDate && (
                    <p className="order-1 text-green-900 bg-green-300/30 border border-green-800/80  shadow-input select-none font-medium rounded-lg px-3 dark:bg-[#75f5a8]/20 dark:border-[#86dda9] dark:text-white dark:shadow-none">
                      HOY
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1 mt-6 lg:mt-8">
                  <div className="flex flex-col sm:gap-2">
                    <h3 className="font-bold text-lg lg:text-xl">
                      {data.name}
                    </h3>
                    <h4 className="text-sm font-light">
                      Información acerca del viaje:
                    </h4>
                  </div>
                  <div className="flex flex-col w-full bg-background gap-2 border px-1 py-4 shadow-inner rounded-md dark:bg-[#171717]">
                    <div className="flex flex-col gap-2 overflow-auto pb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-accent shrink-0 " />
                        <span className="dark:text-white font-medium">
                          Salida:
                        </span>{" "}
                        <span className="shrink-0">{data.from}</span>
                        <Separator className="w-2 bg-border-color dark:bg-border-color-dark" />
                        <Clock className="h-4 w-4 text-accent shrink-0 " />
                        <span className="shrink-0">
                          {data.departureTime} hs.
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-accent shrink-0 " />
                        <span className="dark:text-white font-medium">
                          Destino:
                        </span>{" "}
                        <span className="shrink-0">{data.to}</span>
                        <Separator className="w-2 bg-border-color dark:bg-border-color-dark" />
                        <Clock className="h-4 w-4 text-accent shrink-0 " />
                        <span className="shrink-0">{data.arrivalTime} hs.</span>
                      </div>
                      <p className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-accent " />
                        <span className="dark:text-white font-medium">
                          Precio:{" "}
                        </span>
                        ${data.price}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator className="w-8 self-center mt-2 bg-border-color lg:hidden dark:bg-border-color-dark" />
                <div className="flex flex-col gap-1 py-2">
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium flex items-center gap-[2px] dark:text-white">
                      <User className="h-5 w-5 text-accent shrink-0 " />
                      Mis datos para este viaje
                    </h5>
                    <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
                      <Button
                        onClick={() => navigate("/mi-perfil/editar-perfil")}
                        className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white"
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 px-1 text-sm">
                    <h6 className="font-serif dark:text-white font-semibold">
                      Carmen de Areco:
                    </h6>
                    <div className="flex items-center gap-[2px] ">
                      <Milestone className="w-4 h-4 text-accent " />
                      <span className="font-medium dark:text-white">
                        Dirreción:
                      </span>
                      {user && (
                        <p>{`${user.addressCda.street} ${user.addressCda.streetNumber}`}</p>
                      )}
                    </div>
                    {user && (
                      <div className="flex items-center gap-[2px]">
                        <Crop className="w-4 h-4 text-accent " />
                        <span className="font-medium dark:text-white">
                          Calles que cruzan:
                        </span>{" "}
                        {user.addressCda.crossStreets}
                      </div>
                    )}
                    <h6 className="font-serif dark:text-white font-semibold">
                      Capital Federal:
                    </h6>
                    <div className="flex items-center gap-[2px]">
                      <Milestone className="w-4 h-4 text-accent " />
                      <span className="font-medium dark:text-white">
                        Dirreción:
                      </span>{" "}
                      <p>{user && user.addressCapital}</p>
                    </div>
                  </div>
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
