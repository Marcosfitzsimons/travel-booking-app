import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  AlertCircle,
  DollarSign,
  CalendarDays,
  Clock,
  Heart,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import miniBus from "../assets/minibus1-sm.png";
import DefaultButton from "./DefaultButton";
import Logo from "./Logo";

interface Trip {
  _id: number;
  name: string;
  date: string;
  from: string;
  departureTime: string;
  to: string;
  arrivalTime: string;
  maxCapacity: number;
  price: number;
  available: boolean;
  passengers: string[];
}

type TripProps = Trip;

const TripCard = ({
  name,
  date,
  from,
  _id,
  departureTime,
  to,
  arrivalTime,
  price,
  maxCapacity,
  passengers,
}: TripProps) => {
  const isMaxCapacity = maxCapacity === passengers.length;

  const todayDate = moment().locale("es").format("ddd DD/MM");

  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleReservation = () => {
    if (user) {
      navigate(`/viajes/${_id}`);
    } else {
      navigate("/login");
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
    <article className="w-full flex justify-center items-center relative mx-auto rounded-md shadow-md pb-2 max-w-[400px] bg-white/40 border border-border-color dark:bg-black/40 dark:border-border-color-dark">
      <div
        className={`${
          maxCapacity === passengers.length ? "opacity-50" : ""
        } w-full px-4 pt-9`}
      >
        <div className="flex flex-col gap-2">
          <div className="absolute top-[.6rem] left-5">
            <img
              src={miniBus}
              alt="combi"
              className="w-10 h-9 lg:w-12 lg:h-11 hover:-rotate-12 transition-transform"
            />
          </div>
          <div className="absolute right-4 top-2 flex items-center gap-2">
            <p className="text-teal-900 order-2 font-medium flex items-center select-none gap-1 rounded-2xl border border-teal-800/80 bg-teal-300/30 dark:bg-teal-800  dark:border-teal-400/80 dark:text-white px-3 py-0.5">
              <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
              {formatDate(date)}
            </p>
            {formatDate(date) === todayDate && (
              <p className="text-green-900 bg-green-300/30 border border-green-800/80 order-1 select-none font-medium rounded-2xl dark:bg-[#75f5a8]/30 dark:border-[#4ca770] dark:text-white px-3 py-0.5">
                HOY
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-4 lg:mt-7">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-lg lg:text-xl">{name}</h3>
            </div>
            <div className="flex flex-col w-full bg-blue-lagoon-200/10 gap-2 border border-border-color p-4 shadow-inner rounded-md dark:bg-blue-lagoon-700/10 dark:border-border-color-dark">
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-lagoon-800" />
                  <span className="dark:text-white font-medium">
                    Salida:
                  </span>{" "}
                  {departureTime}
                  <span>- {from}</span>
                </p>
                {arrivalTime && (
                  <div className="flex items-center gap-1">
                    <p className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-lagoon-800" />
                      <span className="dark:text-white font-medium">
                        Llegada:
                      </span>{" "}
                      {arrivalTime}
                      <span>- {to}</span>
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="">
                            <AlertCircle className="h-4 w-4 text-yellow-300" />
                            <span className="sr-only">Alert Circle</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="">
                          <p className="">
                            El horario de llegada estimado es aproximado y puede
                            variar
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                <p className="flex items-center gap-1">
                  <DollarSign className="text-blue-lagoon-900 dark:text-blue-lagoon-800 h-4 w-4" />
                  <span className="dark:text-white font-medium">Precio: </span>$
                  {price}
                </p>
              </div>
            </div>
          </div>
          <div className="py-1 lg:self-end lg:py-2">
            <div
              className="w-[min(24rem,100%)] flex justify-center"
              onClick={!isMaxCapacity ? handleReservation : undefined}
            >
              <DefaultButton isMaxCapacity={isMaxCapacity}>
                Reservar
              </DefaultButton>
            </div>
          </div>
        </div>
      </div>
      {maxCapacity === passengers.length && (
        <p className="absolute px-4 py-4 font-medium order-3 flex flex-col items-center justify-center select-none gap-2 rounded-lg bg-white border border-border-color dark:border-border-color-dark dark:bg-black dark:text-white">
          <Logo />
          <span>¡Combi llena!</span>
          <span className="flex items-center gap-1">
            Gracias por elegirnos{" "}
            <Heart
              className="w-4 h-4 relative top-[1px] dark:text-black"
              fill="red"
            />
          </span>
        </p>
      )}
    </article>
  );
};

export default TripCard;
