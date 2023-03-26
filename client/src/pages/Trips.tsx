import { useEffect, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
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
        <div className="flex flex-col gap-2">
          <p>Buscar por fecha:</p>
          <DatePicker
            dateFormat={"dd/MM/yyyy"}
            locale="es"
            className="cursor-pointer rounded-lg border border-blue-lagoon-700/50 bg-white/80 shadow-md shadow-blue-lagoon-500/10 dark:border-zinc-600 p-2 dark:text-white dark:bg-[#262626]"
            selected={startDate}
            minDate={new Date()}
            InputProps={{
              style: startDate ? highlightSelectedDate : {},
            }}
            onChange={(date) => setStartDate(date)}
          />
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
