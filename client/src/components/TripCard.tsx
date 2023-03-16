import { format } from "date-fns";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { AuthContext } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Bus } from "lucide-react";

interface Trip {
  _id: number;
  name: string;
  type: string;
  date: string;
  from: string;
  departureTime: string;
  to: string;
  arrivalTime: string;
  maxCapacity: number;
  image?: string;
  price: number;
  available: boolean;
  seats: string[];
}

type TripProps = Trip & {
  dateSelected: string | null;
};

const TripCard = ({
  name,
  date,
  from,
  _id,
  departureTime,
  to,
  arrivalTime,
  price,
  image,
  dateSelected,
}: TripProps) => {
  const todayDate = format(new Date(), "dd/MM/yy");

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
    <article className="relative bg-white/80 rounded-md shadow-md border border-slate-200 border-l-4 border-l-slate-200 mb-10 pb-2 max-w-lg lg:max-w-xl dark:bg-[#262626] dark:border-neutral-700 dark:border-l-neutral-900">
      <div className="px-4 pt-9 pb-4 lg:px-5 lg:py-6">
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-6 lg:items-center lg:justify-between lg:border-none lg:pb-0">
          {image && (
            <div className="absolute w-14 top-[-1.8rem] left-4 rounded-full lg:w-24 lg:relative lg:top-0 lg:left-0 ">
              <Avatar className="w-14 h-14 rounded-full lg:rounded-md lg:w-24 lg:h-24">
                <AvatarImage
                  src={image ? image : "https://i.pravatar.cc/150"}
                  className="lg:rounded-md"
                />
                <AvatarFallback className="lg:rounded-md">
                  <Bus />
                </AvatarFallback>
              </Avatar>
            </div>
          )}
          <div className="absolute right-4 top-2 flex items-center gap-2">
            <p className="font-medium text-lg dark:text-white">{date}</p>
            {dateSelected === todayDate && (
              <p className="text-[#3f8059] dark:text-[#7bfdaf] px-3 shadow-sm bg-[#6fe79f]/60 rounded-2xl border border-[#41865d] dark:bg-[#6fe79f]/10 dark:border-[#4cc97e]">
                HOY
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:w-full">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-lg lg:text-xl dark:text-white">
                {name}
              </h3>
            </div>
            <div className="flex flex-col w-full bg-[#fafafa] gap-2 border border-slate-200 p-4 shadow-inner rounded-md lg:pr-16 lg:max-w-[22rem] dark:bg-neutral-900 dark:border-neutral-700">
              <div className="flex flex-col gap-2">
                <p className="lg:text-base lg:text-md flex items-center gap-1">
                  <span className="dark:text-white font-medium">Salida:</span>{" "}
                  {departureTime}
                  <span>- {from}</span>
                </p>
                {arrivalTime && (
                  <p className="lg:text-base lg:text-md flex items-center gap-1">
                    <span className="dark:text-white font-medium">
                      Llegada:
                    </span>{" "}
                    {arrivalTime}
                    <span>- {to}</span>
                  </p>
                )}
              </div>
              <p className="lg:text-base lg:text-md">
                <span className="dark:text-white font-medium">Precio: </span>$
                {price}
              </p>
            </div>
          </div>
          <div className="lg:self-end">
            <div className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[11px] dark:after:shadow-highlight dark:after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
              <Button
                variant="default"
                onClick={handleReservation}
                className="w-full relative rounded-xl text-neutral-300 bg-black hover:text-white dark:shadow-input dark:shadow-black/5 dark:hover:text-white"
              >
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TripCard;
