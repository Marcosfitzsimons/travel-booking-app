import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Trip {
  _id: number;
  name: string;
  type: string;
  date: string;
  from: string;
  roundTrip: boolean;
  departureTime: string;
  to: string;
  returnTime?: string;
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
  returnTime,
  roundTrip,
  price,
  image,
  dateSelected,
}: TripProps) => {
  const todayDate = format(new Date(), "dd/MM/yy");

  const [isRoundTrip, setIsRoundTrip] = useState(roundTrip);
  const [selectedValue, setSelectedValue] = useState("ida");

  const HandleSelectedChange = (selectedValue: string) => {
    setSelectedValue(selectedValue);
    setIsRoundTrip((prev) => !prev);
  };

  return (
    <article className="relative bg-white/80 rounded-md shadow-md shadow-red/10 border-l-4 border-l-red mb-10 pb-2 dark:bg-[#262626] max-w-lg">
      <div className="px-4 pt-9 pb-4 flex flex-col gap-4 lg:px-10 lg:pt-6 lg:pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:border-none lg:pb-0 lg:gap-4">
          {image && (
            <div className="absolute w-14 top-[-1.7rem] left-4 rounded-full lg:w-24 lg:self-start lg:relative lg:top-0 lg:left-0 ">
              <img
                src={image}
                alt="trip image"
                className="w-14 h-14 rounded-full lg:rounded-md lg:w-24 lg:h-20"
              />
            </div>
          )}
          {dateSelected === todayDate && (
            <p className="absolute right-4 -top-3 rounded-md px-2 bg-[#68c58d]">
              HOY
            </p>
          )}
          <div className="flex flex-col lg:gap-1">
            <h3 className="font-bold text-red lg:text-lg ">{name}</h3>
            <p className="font-medium lg:text-base lg:text-md">Fecha: {date}</p>
            <p className="font-medium lg:text-base lg:text-md">
              Salida: {departureTime}
            </p>
            {isRoundTrip && <p>Vuelta: {returnTime}</p>}
            <Select value={selectedValue} onValueChange={HandleSelectedChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ida" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ida">Ida</SelectItem>
                <SelectItem value="vuelta">Ida y vuelta</SelectItem>
              </SelectContent>
            </Select>
            {isRoundTrip ? (
              <p>
                Precio: ${price * 2}{" "}
                <span className="text-red">Ida y vuelta</span>
              </p>
            ) : (
              <p className="font-medium lg:text-base lg:text-md ">
                Precio: ${price}
              </p>
            )}
          </div>
          <div className="self-end">
            <Button>
              <Link to={`/viajes/${_id}`}>Reservar</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TripCard;
