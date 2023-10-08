import { useNavigate } from "react-router-dom";
import { DollarSign, CalendarDays, Heart, MapPin } from "lucide-react";
import DefaultButton from "./DefaultButton";
import { Separator } from "./ui/separator";
import CountdownTimer from "./CountdownTimer";
import formatDate from "@/lib/utils/formatDate";
import getTodayDate from "@/lib/utils/getTodayDate";
import { TripProps } from "@/types/props";
import TripDataBox from "./TripDataBox";
import TripTime from "./TripTime";
import useAuth from "@/hooks/useAuth";
import GorgeousBoxBorder from "./GorgeousBoxBorder";
import GorgeousBorder from "./GorgeousBorder";
import TripDate from "./TripDate";
import TodayDate from "./TodayDate";

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
  const { auth } = useAuth();
  const user = auth?.user;

  const isMaxCapacity = maxCapacity === passengers.length;
  const todayDate = getTodayDate();

  const navigate = useNavigate();

  const handleReservation = () => {
    if (user) {
      navigate(`/viajes/${_id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <GorgeousBoxBorder className="w-full max-w-[400px]">
      <article className="group w-full flex justify-center items-center relative mx-auto rounded-lg shadow-input pb-2 max-w-[400px] bg-card border dark:shadow-none">
        <CountdownTimer date={date} departureTime={departureTime} />
        <div className="w-full px-2 pt-9 sm:px-4">
          <div className="flex flex-col gap-2">
            <div className="absolute top-[0.75rem] left-2.5 sm:left-4 flex flex-col gap-[3px] transition-transform ">
              <span className="w-8 h-[4px] bg-red-700 rounded-full " />
              <span className="w-4 h-[4px] bg-red-700 rounded-full " />
              <span className="w-2 h-[4px] bg-red-700 rounded-full " />
            </div>

            <div className="absolute right-2 sm:right-4 top-2 flex flex-row-reverse items-center gap-2">
              <TripDate date={formatDate(date)} />
              {formatDate(date) === todayDate && <TodayDate />}
            </div>

            <div className="flex flex-col gap-1 relative">
              <div className="flex flex-col gap-1 mt-2">
                <h3 className="font-bold text-lg lg:text-xl">{name}</h3>
                <h4 className="text-sm font-light text-card-foreground">
                  Información acerca del viaje
                </h4>
              </div>
              <GorgeousBoxBorder>
                <div className="flex flex-col w-full gap-2 border px-2 py-1 shadow-inner rounded-lg dark:bg-[#171717]">
                  <div className="flex flex-col overflow-auto pb-2">
                    <TripDataBox
                      icon={<MapPin className="h-5 w-5 text-accent shrink-0" />}
                      text="Salida"
                    >
                      <div className="flex items-center gap-1">
                        <p className="shrink-0">{from}</p>
                        <Separator className="w-1" />
                        <TripTime>{departureTime} hs</TripTime>
                      </div>
                    </TripDataBox>
                    <TripDataBox
                      icon={<MapPin className="h-5 w-5 text-accent shrink-0" />}
                      text="Destino"
                    >
                      <div className="flex items-center gap-1">
                        <p className="shrink-0">{to}</p>
                        <Separator className="w-1" />
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
              </GorgeousBoxBorder>
            </div>
            <div
              className={`${
                isMaxCapacity
                  ? "lg:self-center py-1 lg:py-0"
                  : "lg:self-end py-1 lg:py-2"
              } `}
            >
              {isMaxCapacity ? (
                <div className="flex flex-col items-center justify-center select-none">
                  <span className="font-medium">¡Combi completa!</span>
                  <span className="flex items-center gap-1">
                    <Heart
                      className="w-4 h-4 relative top-[1px] dark:text-black"
                      fill="red"
                    />
                    <p>Gracias por elegirnos</p>
                    <Heart
                      className="w-4 h-4 relative top-[1px] dark:text-black"
                      fill="red"
                    />
                  </span>
                </div>
              ) : (
                <div
                  className="w-[min(24rem,100%)] flex justify-center"
                  onClick={!isMaxCapacity ? handleReservation : undefined}
                >
                  <DefaultButton isMaxCapacity={isMaxCapacity}>
                    Reservar
                  </DefaultButton>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-border w-2 absolute -bottom-7 self-center" />
      </article>
    </GorgeousBoxBorder>
  );
};

export default TripCard;
