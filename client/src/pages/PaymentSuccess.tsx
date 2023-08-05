import BackButton from "@/components/BackButton";
import Loading from "@/components/Loading";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  CheckCircle,
  Clock,
  DollarSign,
  Heart,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment-timezone";

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

const INITIAL_VALUES = {
  _id: "",
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

type PaymentProps = {
  setIsUserInfo: (value: boolean) => void;
};

const PaymentSuccess = ({ setIsUserInfo }: PaymentProps) => {
  const [data, setData] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const locationn = useLocation();
  const path = locationn.pathname;
  const parts = path.split("/");

  const userId = parts[2];
  const tripId = parts[3];

  const { toast } = useToast();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const todayDate = moment().locale("es").format("ddd DD/MM");
  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

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
    if (!isLoaded) {
      setIsLoaded(true);
      return;
    }
    const handleConfirmPassenger = async () => {
      try {
        await axios.post(
          `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
          {
            userId: userId,
            isPaid: true,
          },
          { headers }
        );
        toast({
          description: (
            <div className="flex items-center gap-1">
              {<CheckCircle className="w-[15px] h-[15px]" />} Lugar guardado con
              éxito.
            </div>
          ),
        });
      } catch (err: any) {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Error al guardar su lugar",
          action: (
            <ToastAction altText="Mis viajes" asChild>
              <Link to="/mi-perfil" onClick={() => setIsUserInfo(false)}>
                Mis viajes
              </Link>
            </ToastAction>
          ),
          description: err.response.data.msg
            ? err.response.data.msg
            : "Error al guardar lugar, intente más tarde.",
        });
      }
    };
    handleConfirmPassenger();
  }, [isLoaded]);

  useEffect(() => {
    const getTrip = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://fabebus-api-example.onrender.com/api/trips/${userId}/${tripId}`
        );

        setData({ ...res.data });
      } catch (err) {
        setLoading(false);
      }
      setLoading(false);
    };
    getTrip();
  }, []);

  return (
    <section className="section">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col items-center justify-center gap-6 mt-4"
      >
        <div className="flex w-full flex-col items-center gap-6">
          <div className="w-full relative flex flex-col items-center mt-2 max-w-sm">
            <div className="absolute -top-4 flex items-center justify-center w-8 aspect-square rounded-full border-2 bg-[#6fa194] border-white dark:bg-[#609285]">
              <Check className="h-5 w-5 text-white" />
            </div>
            <div className="w-11/12 pt-6 mx-auto flex flex-col text-center items-center gap-1 p-3 rounded-md bg-[#6fa194] text-white dark:bg-[#609285]">
              <h3 className="font-medium text-lg">Pago realizado con éxito!</h3>
            </div>
          </div>

          <p className="flex items-center gap-1">
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

          <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
            <Link
              to="/mi-perfil"
              onClick={() => setIsUserInfo(false)}
              className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white "
            >
              Ir a mis viajes
            </Link>
          </div>
        </div>
        <Separator className="w-4" />
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-2">
            <h1>Más información acerca de tu viaje</h1>
            <article
              key={data._id}
              className="relative w-full flex justify-center items-center mx-auto rounded-md shadow-input pb-4 max-w-[400px] bg-card border dark:shadow-none"
            >
              <div className="w-full px-2 pt-9 sm:px-4">
                <div className="flex flex-col gap-2">
                  <div className="absolute top-[0.75rem] left-2.5 sm:left-4 flex flex-col gap-[3px] transition-transform ">
                    <span className="w-8 h-[4px] bg-red-700 rounded-full " />
                    <span className="w-4 h-[4px] bg-red-700 rounded-full " />
                    <span className="w-2 h-[4px] bg-red-700 rounded-full " />
                  </div>
                  <div className="absolute right-2 top-2 flex items-center gap-2 sm:right-4">
                    <p className="text-teal-900 order-2 font-medium flex items-center select-none gap-1 rounded-lg border border-slate-800/60 bg-slate-200/30 dark:bg-slate-800/70 dark:border-slate-200/80 dark:text-white px-3">
                      <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
                      {formatDate(data.date)}
                    </p>
                    {formatDate(data.date) === todayDate && (
                      <p className="text-green-900 bg-green-300/30 border border-green-800/80 order-1 select-none font-medium rounded-lg dark:bg-[#75f5a8]/20 dark:border-[#86dda9] dark:text-white px-3 py-0">
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
                      <div className="flex flex-col gap-2 overflow-auto">
                        <p className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-accent shrink-0 " />
                          <span className="dark:text-white font-medium">
                            Salida:
                          </span>{" "}
                          <span className="shrink-0">{data.from}</span>
                          <Separator className="w-2 bg-border" />
                          <Clock className="h-4 w-4 text-accent shrink-0 " />
                          <span className="shrink-0">
                            {data.departureTime} hs.
                          </span>
                        </p>
                        <p className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-accent shrink-0 " />
                          <span className="dark:text-white font-medium">
                            Destino:
                          </span>{" "}
                          <span className="shrink-0">{data.to}</span>
                          <Separator className="w-2 bg-border" />
                          <Clock className="h-4 w-4 text-accent shrink-0 " />
                          <span className="shrink-0">
                            {data.arrivalTime} hs.
                          </span>
                        </p>
                        <p className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-accent " />
                          <span className="dark:text-white font-medium">
                            Precio:
                          </span>
                          <span className="">${data.price}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default PaymentSuccess;
