import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  DollarSign,
  CalendarDays,
  Heart,
  MapPin,
  CheckCircle,
} from "lucide-react";

import DefaultButton from "./DefaultButton";
import { Separator } from "./ui/separator";
import CountdownTimer from "./CountdownTimer";
import formatDate from "@/lib/utils/formatDate";
import getTodayDate from "@/lib/utils/getTodayDate";
import { TripProps } from "@/types/props";
import TripDataBox from "./TripDataBox";
import TripTime from "./TripTime";

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
  const todayDate = getTodayDate();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleReservation = () => {
    if (user) {
      navigate(`/viajes/${_id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <article
      className={`${
        maxCapacity === passengers.length
          ? "dark:border-zinc-800"
          : "dark:border"
      } group w-full flex justify-center items-center relative mx-auto rounded-md shadow-input pb-2 max-w-[400px] bg-card border dark:shadow-none`}
    >
      <CountdownTimer date={date} departureTime={departureTime} />
      <div
        className={`${
          maxCapacity === passengers.length ? "opacity-50" : ""
        } w-full px-2 pt-9 sm:px-4`}
      >
        <div className="flex flex-col gap-2">
          <div className="absolute top-[0.75rem] left-2.5 sm:left-4 flex flex-col gap-[3px] transition-transform ">
            <span className="w-8 h-[4px] bg-red-700 rounded-full " />
            <span className="w-4 h-[4px] bg-red-700 rounded-full " />
            <span className="w-2 h-[4px] bg-red-700 rounded-full " />
          </div>

          <div className="absolute right-2 sm:right-4 top-2 flex items-center gap-2">
            <p className="text-teal-900 order-2 font-medium flex items-center shadow-input select-none gap-1 rounded-lg border border-slate-800/60 bg-slate-200/30 px-3 dark:bg-slate-800/70 dark:border-slate-200/80 dark:text-white dark:shadow-none">
              <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
              {formatDate(date)}
            </p>
            {formatDate(date) === todayDate && (
              <p className="order-1 text-green-900 bg-green-300/30 border border-green-800/80  shadow-input select-none font-medium rounded-lg px-3 dark:bg-[#75f5a8]/20 dark:border-[#86dda9] dark:text-white dark:shadow-none">
                HOY
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 relative">
            <div className="flex flex-col gap-1 mt-2">
              <h3 className="font-bold text-lg lg:text-xl">{name}</h3>
              <h4 className="text-sm font-light text-card-foreground">
                Información acerca del viaje
              </h4>
            </div>

            <div className="flex flex-col w-full gap-2 border px-2 py-1 shadow-inner rounded-md dark:bg-[#171717]">
              <div className="flex flex-col overflow-auto pb-2">
                <TripDataBox
                  icon={<MapPin className="h-5 w-5 text-accent shrink-0" />}
                  text="Salida"
                >
                  <div className="flex items-center gap-1">
                    <p>{from}</p>
                    <Separator className="w-2" />
                    <TripTime>{departureTime} hs</TripTime>
                  </div>
                </TripDataBox>
                <TripDataBox
                  icon={<MapPin className="h-5 w-5 text-accent shrink-0" />}
                  text="Destino"
                >
                  <div className="flex items-center gap-1">
                    <p>{to}</p>
                    <Separator className="w-2" />
                    <TripTime>{arrivalTime} hs</TripTime>
                  </div>
                </TripDataBox>
                <TripDataBox
                  icon={<DollarSign className="h-5 w-5 text-accent" />}
                  text="Precio"
                >
                  {price}
                </TripDataBox>
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
      <Separator className="bg-border w-4 absolute -bottom-7 self-center" />
    </article>
  );
};

export default TripCard;
