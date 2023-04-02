import { AlertCircle, CalendarDays, Ticket, Watch } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const MyTrips = ({ userTrips, loading }) => {
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

  return (
    <section className="w-full mx-auto mt-6  bg-transparent flex flex-col gap-5 items-center">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full flex flex-col"
      >
        {loading ? (
          "loading"
        ) : (
          <>
            {userTrips && userTrips.length > 0 ? (
              <>
                {userTrips.map((trip) => (
                  <article
                    key={trip.id}
                    className="w-full relative bg-white/80 border border-blue-lagoon-500/20 rounded-md shadow-md mb-10 pb-2 max-w-md dark:bg-[#262626] dark:border-blue-lagoon-100/20"
                  >
                    <div className="px-4 pt-9 pb-4">
                      <div className="flex flex-col gap-2">
                        <div className="absolute top-[.6rem] left-5">
                          <img
                            src="./minibus1-sm.png"
                            alt="combi"
                            className="w-10 h-9 lg:w-12 lg:h-11"
                          />
                        </div>
                        <div className="absolute right-4 top-2 flex items-center gap-2">
                          <p className="font-medium flex items-center select-none gap-1 px-2 rounded-2xl bg-blue-lagoon-300/10 shadow-sm border border-blue-lagoon-200 dark:bg-blue-lagoon-900/70 dark:border-blue-lagoon-400 dark:text-white">
                            <CalendarDays className="w-5 h-5" /> {trip.date}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 mt-2  lg:mt-4">
                          <div className="flex items-center gap-4">
                            <h3 className="font-bold text-lg mt-2 dark:text-white lg:text-xl">
                              {trip.name}
                            </h3>
                          </div>
                          <div className="flex flex-col w-full bg-blue-lagoon-300/10 gap-2 border border-blue-lagoon-700/50 p-4 shadow-inner rounded-md dark:bg-blue-lagoon-700/10 dark:border-blue-lagoon-300">
                            <div className="flex flex-col gap-2">
                              <p className="flex items-center gap-1">
                                <Watch className="w-5 h-5 text-blue-lagoon-800 dark:text-white" />
                                <span className="dark:text-white font-medium">
                                  Salida:
                                </span>{" "}
                                {trip.departureTime}
                                <span>- {trip.from}</span>
                              </p>
                              {trip.arrivalTime && (
                                <div className=" flex items-center gap-1">
                                  <p className="flex items-center gap-1">
                                    <Watch className="w-5 h-5 text-blue-lagoon-800 dark:text-white" />
                                    <span className="dark:text-white font-medium">
                                      Llegada:
                                    </span>{" "}
                                    {trip.arrivalTime}
                                    <span>- {trip.to}</span>
                                  </p>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button className="">
                                          <AlertCircle className="h-4 w-4 text-yellow-300" />
                                          <span className="sr-only">
                                            Alert Circle
                                          </span>
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="">
                                          El horario de llegada estimado es
                                          aproximado y puede variar
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              )}
                              <p className="flex items-center gap-1">
                                <Ticket className="w-5 h-5 text-blue-lagoon-800 dark:text-white" />
                                <span className="dark:text-white font-medium">
                                  Precio:{" "}
                                </span>
                                ${trip.price}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="self-center flex items-center justify-between mt-3">
                          <button onClick={() => {}} className="text-red-600">
                            Cancelar viaje
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </>
            ) : (
              <div className="">
                <p>No tenes viajes reservados.</p>
              </div>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
};

export default MyTrips;
