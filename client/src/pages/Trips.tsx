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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
    "https://fabebus-api-example.onrender.com/api/trips"
  );

  const availableTrips = data.filter((trip: TripProps) => {
    const combinedDateTime = `${trip.date.split("T")[0]}T${trip.departureTime}`;
    const targetDateTime = new Date(combinedDateTime); // Convert the date string to a Date object

    // Calculate the time difference in milliseconds between the target time and the current time
    const timeDifference = targetDateTime.getTime() - new Date().getTime();
    return timeDifference > 0;
  });

  let filteredTrips;
  let dateSelected: string;
  if (startDate) {
    dateSelected = moment(startDate).locale("es").format("ddd DD/MM");
    filteredTrips = availableTrips.filter((trip: TripProps) => {
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
      <div className="relative flex flex-col gap-1 w-[min(100%,320px)] sm:w-[min(80%,320px)] md:flex-row md:items-center md:justify-between md:w-full">
        <div className="flex flex-col gap-1">
          <div className="relative flex items-end gap-1 w-[min(100%,188px)] shrink-0">
            <DatePickerContainer
              startDate={startDate}
              setStartDate={setStartDate}
            />
            <div className="absolute -right-[46px] h-full">
              <div className="relative flex w-[38px] h-full aspect-square before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-pink-1-800/50 before:ring-2 before:ring-slate-400/10 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 focus-within:after:shadow-pink-1-700/30 after:transition dark:focus-within:after:shadow-pink-1-300/40 dark:before:ring-slate-800/60 dark:before:border-pink-1-300">
                <Button
                  className="absolute w-[38px] h-full flex items-center justify-center cursor-pointer p-2 bg-card rounded-lg border  border-slate-800/20 shadow-input dark:bg-[hsl(0,0%,11%)] dark:border-slate-800 dark:shadow-none !outline-none dark:hover:text-white"
                  onClick={() => setStartDate(null)}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-2 space-x-2 md:self-end">
          <Checkbox id="terms" defaultChecked />
          <Label htmlFor="terms">
            Mostrar solo viajes con lugares disponibles
          </Label>
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
          <div className="mt-8 flex flex-col items-center gap-10 md:grid md:justify-items-center md:grid-cols-2 xl:grid-cols-3">
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
                  {availableTrips.length !== 0 ? (
                    availableTrips.map((trip: TripProps) => (
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
