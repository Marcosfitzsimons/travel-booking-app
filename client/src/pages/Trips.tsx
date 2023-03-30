import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // use it to format the date and to filter by each trip. format(startDate, "dd/MM/yyyy") -> dd/MM/yyyy
import TripCard from "../components/TripCard";
import useFetch from "../hooks/useFetch";
import SectionTitle from "../components/ui/SectionTitle";
import DatePickerContainer from "../components/DatePickerContainer";

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

const sectionVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: "backInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "backInOut",
    },
  },
};

const Trips = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/trips"
  );

  const dateSelected = format(startDate, "dd/MM/yy");

  const filteredTrips = data.filter(
    (trip: TripProps) => trip.date === dateSelected
  );

  return (
    <section className="">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col gap-2"
      >
        <SectionTitle>Próximos viajes:</SectionTitle>
        <div className="flex items-center gap-3 w-[min(90%,320px)] sm:w-[min(80%,320px)]">
          <p className="shrink-0">Buscar por fecha:</p>
          <DatePickerContainer
            startDate={startDate}
            setStartDate={setStartDate}
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
      </motion.div>
    </section>
  );
};

export default Trips;
