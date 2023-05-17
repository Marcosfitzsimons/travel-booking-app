import { useState } from "react";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");
import { AnimatePresence, motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import TripCard from "../components/TripCard";
import useFetch from "../hooks/useFetch";
import SectionTitle from "../components/SectionTitle";
import DatePickerContainer from "../components/DatePickerContainer";
import Loading from "../components/Loading";
import { Button } from "../components/ui/button";
import { RotateCcw } from "lucide-react";

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
    dateSelected = moment(startDate).locale("es").format("ddd DD/MM");
    filteredTrips = data.filter((trip: TripProps) => {
      moment.locale("es", {
        weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      });
      const momentDate = moment.utc(trip.date);
      const timezone = "America/Argentina/Buenos_Aires";
      const timezone_date = momentDate.tz(timezone);
      const formatted_date = timezone_date.format("ddd DD/MM");

      return formatted_date === dateSelected;
    });
  }

  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

  return (
    <section className="section">
      <SectionTitle>Próximos viajes:</SectionTitle>
      <div className="flex flex-col gap-1 w-[min(100%,320px)] sm:w-[min(80%,320px)] md:flex-row md:items-center md:justify-between md:gap-3">
        <p className="shrink-0">Buscar por fecha:</p>
        <div className="relative flex items-end gap-1 w-[min(100%,188px)] shrink-0">
          <div className="shadow-input shadow-blue-lagoon-800/10 rounded-lg">
            <DatePickerContainer
              startDate={startDate}
              setStartDate={setStartDate}
            />
          </div>
          <div className="absolute -right-[46px] h-full shadow shadow-blue-lagoon-800/10 rounded-lg">
            <div className="relative flex w-[38px] h-full aspect-square before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-blue-lagoon-400 before:ring-2 before:ring-blue-lagoon-200/50 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 focus-within:after:shadow-blue-lagoon-400 after:transition dark:focus-within:after:shadow-blue-lagoon-300/40 dark:before:ring-blue-lagoon-500/20 dark:before:border-blue-lagoon-300">
              <Button
                className="absolute w-[38px] h-full flex items-center justify-center cursor-pointer p-2 bg-white/80 shadow-input shadow-blue-lagoon-500/10 rounded-lg border border-border-color focus:border-blue-lagoon-200/50  dark:border-color-black dark:bg-black/40 dark:hover:text-white dark:focus:border-blue-lagoon-500/20"
                onClick={() => setStartDate(null)}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
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
          <div className="mt-8 flex flex-col items-center gap-6 md:grid md:justify-items-center md:grid-cols-2">
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
