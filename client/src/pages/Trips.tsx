import { useState } from "react";
import moment from "moment-timezone";
import { AnimatePresence, motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // use it to format the date and to filter by each trip. format(startDate, "dd/MM/yyyy") -> dd/MM/yyyy
import TripCard from "../components/TripCard";
import useFetch from "../hooks/useFetch";
import SectionTitle from "../components/SectionTitle";
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

  const { data, loading, error, reFetch } = useFetch(
    "https://travel-booking-api-production.up.railway.app/api/trips"
  );

  let filteredTrips;
  let dateSelected: string;
  if (startDate) {
    dateSelected = format(startDate, "dd/MM/yy");

    filteredTrips = data.filter((trip: TripProps) => {
      const momentDate = moment.utc(trip.date).add(1, "day").toDate();
      const date = moment.tz(momentDate, "America/Argentina/Buenos_Aires");
      const formattedDate = moment(date).format("DD/MM/YY");

      return formattedDate === dateSelected;
    });
  }

  return (
    <section className="section">
      <SectionTitle>Próximos viajes:</SectionTitle>
      <div className="flex items-center justify-between gap-3 w-[min(100%,320px)] sm:w-[min(80%,320px)]">
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
        >
          <div className="mt-8 flex flex-col items-center gap-5 md:grid md:justify-items-center md:grid-cols-2">
            {filteredTrips ? (
              <>
                <AnimatePresence mode="wait">
                  {filteredTrips.length !== 0 ? (
                    filteredTrips.map((item: TripProps) => (
                      <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        className="w-full max-w-md"
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
                      className="w-full mb-[20rem] lg:mb-[28rem]"
                    >
                      No hay viajes disponibles para la fecha seleccionada.
                    </motion.p>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  {data.length !== 0 ? (
                    data.map((trip: TripProps) => (
                      <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        className="w-full max-w-md"
                        exit="exit"
                        key={trip._id}
                      >
                        <TripCard {...trip} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      className="w-full mb-[20rem] lg:mb-[28rem]"
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
