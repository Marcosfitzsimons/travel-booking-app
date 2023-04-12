import { format } from "date-fns";
import moment from "moment-timezone";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AlertCircle, Ticket, CalendarDays, Watch } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import DefaultButton from "./DefaultButton";
import miniBus from "../assets/minibus1-sm.png";

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
}: TripProps) => {
  const todayDate = format(new Date(), "dd/MM/yy");

  const momentDate = moment.utc(date).add(1, "day").toDate();
  const newDate = moment.tz(momentDate, "America/Argentina/Buenos_Aires");
  const formattedDate = moment(newDate).format("DD/MM/YY");
  console.log(`formatted tripDate: ${formattedDate}`);

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
    <article className="w-full relative bg-white/80 border border-blue-lagoon-500/20 rounded-md shadow-md pb-2 max-w-md dark:bg-black dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300">
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
              <CalendarDays className="w-5 h-5" /> {formattedDate}
            </p>
            {formattedDate === todayDate && (
              <p className="text-[#256840] px-3 select-none font-medium shadow-sm bg-green-300/30 rounded-2xl border border-blue-lagoon-200 dark:bg-[#6fe79f]/10 dark:border-[#4cc97e] dark:text-[#7bfdaf]">
                HOY
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-4 lg:mt-7">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-lg dark:text-white lg:text-xl">
                {name}
              </h3>
            </div>
            <div className="flex flex-col w-full bg-blue-lagoon-300/10 gap-2 border border-blue-lagoon-700/50 p-4 shadow-inner rounded-md dark:bg-blue-lagoon-700/10 dark:border-blue-lagoon-300">
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-1">
                  <Watch className="w-5 h-5 text-blue-lagoon-800 dark:text-white" />
                  <span className="dark:text-white font-medium">Salida:</span>{" "}
                  {departureTime}
                  <span>- {from}</span>
                </p>
                {arrivalTime && (
                  <div className=" flex items-center gap-1">
                    <p className="flex items-center gap-1">
                      <Watch className="w-5 h-5 text-blue-lagoon-800 dark:text-white" />
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
                  <Ticket className="text-blue-lagoon-800 dark:text-white h-5 w-5" />
                  <span className="dark:text-white font-medium">Precio: </span>$
                  {price}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:self-end">
            <div className="w-[min(30rem,100%)]" onClick={handleReservation}>
              <DefaultButton>Reservar</DefaultButton>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TripCard;
