import { useEffect, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { format } from "date-fns"; // use it to format the date and to filter by each trip. format(startDate, "dd/MM/yyyy") -> dd/MM/yyyy
import TripCard from "../components/TripCard";
import useFetch from "../hooks/useFetch";
import SectionTitle from "../components/ui/SectionTitle";

interface TripProps {
  _id: number;
  name: string;
  date: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  returnTime?: string;
  maxCapacity: number;
  image?: string;
  price: number;
  available: boolean;
  passengers: string[];
}

const Trips = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  setDefaultLocale("es");
  registerLocale("es", es);

  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/trips"
  );

  const dateSelected = format(startDate, "dd/MM/yy");

  const filteredTrips = data.filter(
    (trip: TripProps) => trip.date === dateSelected
  );
  const highlightSelectedDate = {
    backgroundColor: "#007287",
    fontWeight: "bold",
    color: "#000000",
  };

  return (
    <section className="">
      <div className="flex flex-col gap-2">
        <SectionTitle>Próximos viajes:</SectionTitle>
        <div className="flex items-center gap-3 w-[min(90%,320px)] sm:w-[min(80%,320px)]">
          <p className="shrink-0">Buscar por fecha:</p>
          <div
            className="relative flex items-center w-full before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-blue-lagoon-500 before:ring-2 before:ring-blue-lagoon-400/10 before:transition
after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 focus-within:after:shadow-blue-lagoon-300/40 after:transition dark:focus-within:after:shadow-blue-lagoon-300/40 dark:before:ring-blue-lagoon-500/20 dark:before:border-blue-lagoon-300"
          >
            <CalendarDays className="absolute left-2 w-5 h-5 z-50 dark:text-white" />
            <DatePicker
              dateFormat={"dd/MM/yyyy"}
              locale="es"
              className="cursor-pointer w-full pl-8 font-medium rounded-lg border border-blue-lagoon-100/50 bg-white/80 shadow-input !outline-none shadow-blue-lagoon-500/10 dark:border-blue-lagoon-800/20 p-2 dark:text-white dark:bg-blue-lagoon-300/10"
              selected={startDate}
              minDate={new Date()}
              InputProps={{
                style: startDate ? highlightSelectedDate : {},
              }}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-5">
          {loading ? (
            "loading"
          ) : (
            <>
              {filteredTrips.length !== 0 ? (
                filteredTrips.map((item: TripProps) => (
                  <TripCard
                    key={item._id}
                    {...item}
                    dateSelected={dateSelected}
                  />
                ))
              ) : (
                <p>No hay viajes disponibles para la fecha seleccionada.</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Trips;
