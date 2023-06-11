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
  MapPin,
  Star,
  Flame,
  PartyPopper,
  PartyPopperIcon,
  CheckCircle,
} from "lucide-react";

import miniBus from "../assets/minibus1-sm.png";
import DefaultButton from "./DefaultButton";
import logo from "../assets/fabebus-logo.jpg";
import { Separator } from "./ui/separator";

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
    <article
      className={`${
        maxCapacity === passengers.length
          ? "dark:border-zinc-800"
          : "dark:border-zinc-500"
      } w-full flex justify-center items-center relative mx-auto rounded-md shadow-md pb-2 max-w-[400px] bg-white/40 border border-border-color dark:bg-black/60`}
    >
      <div
        className={`${
          maxCapacity === passengers.length ? "opacity-50" : ""
        } w-full px-2 pt-9 sm:px-4`}
      >
        <div className="flex flex-col gap-2">
          <div className="absolute top-[.45rem] left-1 sm:left-3">
            <img
              src={miniBus}
              alt="combi"
              className="w-10 h-9 lg:w-12 lg:h-11 hover:-rotate-12 transition-transform"
            />
          </div>

          <div
            className={`absolute ${
              maxCapacity !== passengers.length
                ? "right-6 sm:right-8"
                : "right-4"
            } top-2 flex items-center gap-2`}
          >
            <p className="text-teal-900 order-2 font-medium flex items-center select-none gap-1 rounded-lg border border-slate-800/60 bg-slate-200/30 dark:bg-slate-800/70 dark:border-slate-200/80 dark:text-white px-3">
              <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
              {formatDate(date)}
            </p>
            {formatDate(date) === todayDate && (
              <p className="text-green-900 bg-green-300/30 border border-green-800/80 order-1 select-none font-medium rounded-lg dark:bg-[#75f5a8]/20 dark:border-[#86dda9] dark:text-white px-3">
                HOY
              </p>
            )}
            {maxCapacity !== passengers.length && (
              <p className="flex items-center gap-1 absolute -right-4">
                <span className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-6 lg:mt-8 relative">
            <div className="flex flex-col sm:gap-2">
              <h3 className="font-bold text-lg lg:text-xl">{name}</h3>
              <h4 className="text-sm font-light">
                Información acerca del viaje:
              </h4>
            </div>
            <div className="relative flex flex-col w-full bg-blue-lagoon-200/10 gap-2 border border-border-color py-3 px-1 shadow-inner rounded-md dark:bg-blue-lagoon-700/10 dark:border-border-color-dark">
              <div className="flex flex-col gap-2 overflow-auto pb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-icon-color shrink-0 dark:text-icon-color-dark" />
                  <span className="font-medium shrink-0 dark:text-white">
                    Salida:
                  </span>{" "}
                  <span className="shrink-0">{from}</span>
                  <Separator className="w-2 bg-border-color dark:bg-border-color-dark" />
                  <Clock className="h-4 w-4 text-icon-color shrink-0 dark:text-icon-color-dark" />
                  <span className="shrink-0">{departureTime} hs.</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-icon-color shrink-0 dark:text-icon-color-dark" />
                  <span className="dark:text-white shrink-0 font-medium">
                    Destino:
                  </span>{" "}
                  <span className="shrink-0">{to}</span>
                  <Separator className="w-2 bg-border-color dark:bg-border-color-dark" />
                  <Clock className="h-4 w-4 text-icon-color shrink-0 dark:text-icon-color-dark" />
                  <span className="shrink-0">{arrivalTime} hs.</span>
                </div>
                <p className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-icon-color dark:text-icon-color-dark" />
                  <span className="dark:text-white font-medium">Precio: </span>
                  <span className="">${price}</span>
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
        <div className="absolute bottom-0 w-full px-4 py-4 font-medium order-3 flex flex-col items-center justify-center border-x-0 border-b-0 select-none gap-2 rounded-lg bg-white border border-border-color dark:border-zinc-500 dark:bg-black dark:text-white">
          <CheckCircle className="w-8 h-8 text-green-500 shrink-0 dark:text-green-300" />
          <span>¡Combi completa!</span>
          <span className="flex items-center gap-1">
            <Heart
              className="w-4 h-4 relative top-[1px] dark:text-black"
              fill="red"
            />
            Gracias por elegirnos{" "}
            <Heart
              className="w-4 h-4 relative top-[1px] dark:text-black"
              fill="red"
            />
          </span>
        </div>
      )}
    </article>
  );
};

export default TripCard;
