import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // use it to format the date and to filter by each trip. format(startDate, "dd/MM/yyyy") -> dd/MM/yyyy
import TripCard from "../components/TripCard";
import useFetch from "../hooks/useFetch";
import SectionTitle from "../components/ui/SectionTitle";
import DatePickerContainer from "../components/DatePickerContainer";
import Loading from "../components/Loading";

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
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "backInOut",
    },
  },
};

const Trips = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  console.log("trips page re-render");
  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/trips"
  );

  let filteredTrips;
  let dateSelected: string;
  if (startDate) {
    dateSelected = format(startDate, "dd/MM/yy");
    console.log(typeof dateSelected);
    filteredTrips = data.filter(
      (trip: TripProps) => trip.date === dateSelected
    );
  }

  return (
    <section className="">
      <SectionTitle>Próximos viajes:</SectionTitle>
      <div className="flex items-center justify-between gap-3 w-[min(100%,285px)] sm:w-[min(80%,320px)]">
        <p className="shrink-0">Buscar por fecha:</p>
        <DatePickerContainer
          startDate={startDate}
          setStartDate={setStartDate}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col w-full gap-2"
        >
          <div className="mt-8 flex flex-col gap-2 md:grid md:grid-cols-2">
            {filteredTrips ? (
              <>
                <AnimatePresence>
                  {filteredTrips.length !== 0 ? (
                    filteredTrips.map((item: TripProps) => (
                      <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        key={item._id}
                      >
                        <TripCard {...item} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      key="empty-filtered-trip"
                      exit="exit"
                      className="mb-[20rem] lg:mb-[28rem]"
                    >
                      No hay viajes disponibles para la fecha seleccionada.
                    </motion.p>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <>
                <AnimatePresence>
                  {data.length !== 0 ? (
                    data.map((trip: TripProps) => (
                      <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        key={trip._id}
                      >
                        <TripCard {...trip} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      className="mb-[20rem] lg:mb-[28rem]"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      key="empty-trip"
                    >
                      No hay viajes disponibles.
                    </motion.p>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Trips;
