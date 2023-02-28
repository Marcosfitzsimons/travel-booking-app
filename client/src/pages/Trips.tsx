import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { format } from "date-fns"; // use it to format the date and to filter by each trip. format(startDate, "dd/MM/yyyy") -> dd/MM/yyyy
import TripCard from "../components/TripCard";
import useFetch from "../hooks/useFetch";

interface TripProps {
  _id: number;
  name: string;
  type: string;
  date: string;
  from: string;
  departureTime: string;
  to: string;
  returnTime?: string;
  maxCapacity: number;
  image?: string;
  price: number;
  available: boolean;
  seats: string[];
}

const Trips = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  setDefaultLocale("es");
  registerLocale("es", es);

  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/trips"
  );
  console.log(data);
  return (
    <section className="">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-medium">Nuestros próximos viajes:</h2>
        <div className="flex flex-col gap-2">
          <p>Buscar por fecha:</p>
          <DatePicker
            dateFormat={"dd/MM/yyyy"}
            locale="es"
            className="cursor-pointer rounded-md border bg-white/80 shadow-md border-slate-400 dark:border-slate-700 p-2 dark:text-white dark:bg-zinc-900"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="mt-8 flex flex-col gap-2">
          {loading ? (
            "loading"
          ) : (
            <>
              {data.map((item: TripProps) => (
                <TripCard key={item._id} {...item} />
              ))}{" "}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Trips;
