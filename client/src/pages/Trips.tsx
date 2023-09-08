import { useState } from "react";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import TripCard from "../components/TripCard";
import useFetch from "../hooks/useFetch";
import SectionTitle from "../components/SectionTitle";
import DatePickerContainer from "../components/DatePickerContainer";
import { Button } from "../components/ui/button";
import { Frown, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { TripProps } from "@/types/props";
import sectionVariants from "@/lib/variants/sectionVariants";

const Trips = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isOnlyAvailableTrips, setIsOnlyAvailableTrips] = useState(true);

  const { data, loading, error } = useFetch(`/trips`);

  const availableTrips = data.filter((trip: TripProps) => {
    const combinedDateTime = `${trip.date.split("T")[0]}T${trip.departureTime}`;
    const targetDateTime = new Date(combinedDateTime); // Convert the date string to a Date object

    // Calculate the time difference in milliseconds between the target time and the current time
    const timeDifference = targetDateTime.getTime() - new Date().getTime();
    return timeDifference > 0;
  });

  const onlyTripsAvailableSeats = availableTrips.filter(
    (trip: TripProps) => trip.passengers.length !== trip.maxCapacity
  );

  let filteredTrips;
  let dateSelected: string;
  if (startDate) {
    dateSelected = moment(startDate).locale("es").format("ddd DD/MM");
    filteredTrips = onlyTripsAvailableSeats.filter((trip: TripProps) => {
      const momentDate = moment.utc(trip.date);
      const timezone = "America/Argentina/Buenos_Aires";
      const timezone_date = momentDate.tz(timezone);
      const formatted_date = timezone_date.format("ddd DD/MM");

      return formatted_date === dateSelected;
    });
  }

  return (
    <section className="section flex flex-col gap-3">
      <div className="relative w-full flex items-center justify-center">
        <SectionTitle>Viajes</SectionTitle>
      </div>
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
          <Checkbox
            id="terms"
            checked={isOnlyAvailableTrips}
            onCheckedChange={() => setIsOnlyAvailableTrips((prev) => !prev)}
          />
          <Label htmlFor="terms">
            Mostrar solo viajes con lugares disponibles
          </Label>
        </div>
      </div>
      {error && (
        <p className="pt-2 text-center flex items-center flex-col gap-1">
          Ha ocurrido un error al intentar cargar viajes
          <Frown className="w-5 h-5 shrink-0" />
        </p>
      )}
      {loading ? (
        <CardSkeleton cards={6} />
      ) : (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="mt-5 flex flex-col items-center gap-14 md:grid md:justify-items-center md:grid-cols-2 xl:grid-cols-3">
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
                <AnimatePresence>
                  {isOnlyAvailableTrips ? (
                    onlyTripsAvailableSeats.map((trip: TripProps) => (
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
                    <>
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
                    </>
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
