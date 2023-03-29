import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AlertCircleIcon, CalendarDays, Ticket, Watch } from "lucide-react";
import BackButton from "./BackButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import useFetch from "../hooks/useFetch";

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const { user } = useContext(AuthContext);

  const url = `http://localhost:8800/api/users/${user._id}`;

  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    setUserTrips(data.user?.myTrips);
  }, [data]);
  console.log(data.user?.myTrips);
  // user.myTrips is an array of travel ID. Fix how to get the travel info and not only the travel ID of mytrip array.
  return (
    <section className="w-full mx-auto mt-6  bg-transparent flex flex-col gap-5 items-center">
      <div className="relative w-full bg-white rounded-md border border-blue-lagoon-700/50 px-3 py-16 flex flex-col items-center gap-5 md:w-7/12 md:py-12 dark:bg-[#262626] dark:border-neutral-600">
        <div className="absolute top-3 left-3">
          <BackButton />
        </div>
        {loading ? (
          "loading"
        ) : (
          <>
            {userTrips && userTrips.length > 0 ? (
              <>
                {userTrips.map((trip) => (
                  <article
                    key={trip.id}
                    className="w-full relative bg-blue-lagoon-300/10 border border-blue-lagoon-700/50 rounded-md shadow-md mb-10 pb-2 max-w-md dark:bg-blue-lagoon-700/10 dark:border-blue-lagoon-300"
                  >
                    <div className="px-4 pt-9 pb-4">
                      <div className="flex flex-col gap-2">
                        <div className="absolute top-[.2rem] left-7 lg:left-8 lg:top-[2px]">
                          <div className="relative flex items-center h-12 lg:h-14">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="58"
                              height="58"
                              className="lg:w-[70px] lg:h-[70px]"
                              fill="none"
                              viewBox="0 0 934 934"
                            >
                              <path
                                className="fill-blue-lagoon-900 dark:fill-white"
                                d="M697.779 451.761c-19.657 0-35.657 15.664-35.657 34.918 0 19.249 15.995 34.918 35.657 34.918 19.658 0 35.658-15.664 35.658-34.918 0-19.249-15.995-34.918-35.658-34.918zm0 58.816c-13.46 0-24.407-10.722-24.407-23.902 0-13.18 10.948-23.901 24.407-23.901 13.46 0 24.408 10.726 24.408 23.901 0 13.175-10.948 23.902-24.408 23.902z"
                              ></path>
                              <path
                                className="fill-blue-lagoon-900 dark:fill-white"
                                d="M704.491 469.765h-13.434c-2.009 0-3.873 1.048-4.872 2.754l-6.715 11.391a5.436 5.436 0 000 5.508l6.715 11.385c1.004 1.707 2.863 2.754 4.872 2.754h13.434c2.009 0 3.872-1.047 4.871-2.754l6.715-11.385c1-1.707 1-3.802 0-5.508l-6.715-11.391c-1.004-1.706-2.862-2.754-4.871-2.754zm-3.245 22.776h-6.935l-3.466-5.877 3.466-5.882h6.935l3.466 5.882-3.466 5.877zM271.993 451.761c-19.657 0-35.657 15.664-35.657 34.918 0 19.249 15.995 34.918 35.657 34.918 19.657 0 35.658-15.664 35.658-34.918 0-19.249-15.995-34.918-35.658-34.918zm0 58.816c-13.46 0-24.407-10.722-24.407-23.902 0-13.18 10.948-23.901 24.407-23.901 13.46 0 24.408 10.726 24.408 23.901 0 13.175-10.948 23.902-24.408 23.902z"
                              ></path>
                              <path
                                className="fill-blue-lagoon-900 dark:fill-white"
                                d="M278.717 469.765h-13.434c-2.009 0-3.872 1.048-4.872 2.754l-6.714 11.391c-1 1.706-1 3.801 0 5.508l6.714 11.385c1.005 1.707 2.863 2.754 4.872 2.754h13.434c2.009 0 3.873-1.047 4.872-2.754l6.715-11.385a5.436 5.436 0 000-5.508l-6.715-11.391c-1.004-1.706-2.863-2.754-4.872-2.754zm-3.244 22.776h-6.936l-3.465-5.877 3.465-5.882h6.936l3.465 5.882-3.465 5.877z"
                              ></path>
                              <path
                                className="fill-blue-lagoon-900 dark:fill-white"
                                d="M845.121 433.367V348.25c0-10.653-6.373-20.444-16.232-24.959l-62.965-28.776c-4.7-2.149-8.874-5.405-12.063-9.423l-62.91-79.2c-7.513-9.463-18.843-14.887-31.083-14.887L231.999 191c-27.909 0-50.624 22.245-50.624 49.574v11.017h-22.5c-9.301 0-16.875 7.416-16.875 16.525v88.132c0 9.108 7.574 16.525 16.875 16.525h22.5v60.591c-9.302 0-16.875 7.416-16.875 16.524v27.542c0 9.108 7.573 16.524 16.875 16.524h25.387C210.469 526.001 238.297 551 272.001 551c33.705 0 61.528-24.998 65.234-57.046h295.313C636.255 526.001 664.083 551 697.782 551c33.7 0 61.533-24.998 65.239-57.046h82.104c9.301 0 16.875-7.416 16.875-16.524v-27.542c0-9.108-7.574-16.524-16.875-16.524l-.004.003zm-686.244-71.608c-3.099 0-5.625-2.474-5.625-5.508v-88.132c0-3.035 2.526-5.509 5.625-5.509h22.5v11.017h-11.25c-3.104 0-5.625 2.469-5.625 5.508 0 3.04 2.521 5.508 5.625 5.508h11.25v11.017h-11.25c-3.104 0-5.625 2.469-5.625 5.508 0 3.04 2.521 5.508 5.625 5.508h11.25v11.017h-11.25c-3.104 0-5.625 2.469-5.625 5.508 0 3.04 2.521 5.509 5.625 5.509h11.25v11.016h-11.25c-3.104 0-5.625 2.469-5.625 5.508 0 3.04 2.521 5.509 5.625 5.509h11.25v11.016h-22.5zm33.75 38.558h13.716c7.754 0 14.49-5.149 16.372-12.517l5.625-22.033c1.27-4.972.145-10.141-3.074-14.179-3.224-4.038-8.071-6.354-13.304-6.354h-19.341V240.577c0-21.261 17.663-38.558 39.375-38.558h427.869c8.738 0 16.835 3.875 22.204 10.633l62.909 79.201c4.279 5.39 9.884 9.767 16.187 12.649l62.965 28.775a16.683 16.683 0 017.277 6.453h-31.294c-6.202 0-11.25 4.943-11.25 11.016v20.062c0 2.764 1.035 5.39 2.913 7.406 4.36 4.653 16.846 15.065 42.086 16.437v38.715h-99.365c-10.492-6.949-23.127-11.016-36.722-11.016-13.595 0-26.236 4.067-36.719 11.016h-29.687a5.689 5.689 0 00-3.977 1.613L606.539 455.4h-37.044V306.683h157.499c2.119 0 4.063-1.166 5.017-3.02a5.432 5.432 0 00-.477-5.744l-60.186-80.372c-2.11-2.818-5.505-4.5-9.076-4.5h-92.771c-6.202 0-11.25 4.943-11.25 11.017v231.347H364.187L349 435.581a5.657 5.657 0 00-4.499-2.203h-35.774c-10.491-6.95-23.127-11.017-36.718-11.017-13.59 0-26.236 4.067-36.722 11.017h-42.655v-33.05l-.005-.011zm128.75 44.066h20.316l15.186 19.83a5.659 5.659 0 004.5 2.203h247.498c1.492 0 2.923-.58 3.978-1.613l20.853-20.42h14.709c-9.336 10.436-15.252 23.833-16.126 38.558H337.505c-.874-14.725-6.786-28.122-16.128-38.558zm-145.619 33.05v-27.542c0-3.034 2.527-5.508 5.625-5.508h41.253c-9.336 10.436-15.252 23.834-16.126 38.558h-25.127c-3.098 0-5.625-2.474-5.625-5.508zm96.247 62.553c-30.014 0-54.437-23.911-54.437-53.307s24.423-53.307 54.437-53.307c30.013 0 54.437 23.916 54.437 53.307 0 29.391-24.419 53.307-54.437 53.307zm425.773 0c-30.013 0-54.436-23.911-54.436-53.307s24.418-53.307 54.436-53.307c30.019 0 54.437 23.916 54.437 53.307 0 29.391-24.423 53.307-54.437 53.307zm147.342-57.045h-81.843c-.874-14.724-6.79-28.122-16.127-38.558h97.97c3.099 0 5.625 2.474 5.625 5.508v5.509H777.62c-3.103 0-5.625 2.468-5.625 5.508 0 3.039 2.522 5.508 5.625 5.508h73.125v11.017c0 3.034-2.526 5.508-5.625 5.508z"
                              ></path>
                              <path
                                className="fill-blue-lagoon-900 dark:fill-white"
                                d="M395.125 306.67h146.249c3.104 0 5.625-2.469 5.625-5.508v-77.116c0-6.074-5.048-11.016-11.25-11.016H400.75c-6.202 0-11.25 4.942-11.25 11.016v77.116c0 3.039 2.521 5.508 5.625 5.508zM378.244 301.168v-77.115c0-6.074-5.048-11.017-11.25-11.017H231.995c-15.508 0-28.125 12.354-28.125 27.541v60.591c0 3.04 2.521 5.508 5.625 5.508h163.13c3.104 0 5.625-2.468 5.625-5.508h-.006zM653.86 328.703h-50.625c-3.103 0-5.625 2.469-5.625 5.508v6.704c0 8.449 7.027 15.33 15.655 15.33h30.57c8.629 0 15.655-6.881 15.655-15.33v-6.704c0-3.039-2.521-5.508-5.625-5.508h-.005zm-5.625 12.212c0 2.38-1.974 4.313-4.405 4.313h-30.57c-2.43 0-4.404-1.933-4.404-4.313v-1.195h39.374v1.195h.005z"
                              ></path>
                            </svg>
                            <div className="flex flex-col gap-[2px] absolute -left-[2px] lg:-left-1 top-[14px] lg:top-[16px]">
                              <span className="w-2 h-[1px] rounded-full bg-blue-lagoon-900 relative right-1 dark:bg-white lg:w-[11px]"></span>
                              <span className="w-2 h-[1px] rounded-full bg-blue-lagoon-900 dark:bg-white lg:w-[11px]"></span>
                              <span className="w-2 h-[1px] rounded-full bg-blue-lagoon-900 relative right-2 dark:bg-white lg:w-[11px]"></span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute right-4 top-2 flex items-center gap-2">
                          <p className="font-medium flex items-center select-none gap-1 px-2 rounded-2xl bg-blue-lagoon-300/10 shadow-sm border border-blue-lagoon-200 dark:bg-blue-lagoon-900/70 dark:border-blue-lagoon-400 dark:text-white">
                            <CalendarDays className="w-5 h-5" /> {trip.date}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 mt-2  lg:mt-4">
                          <div className="flex items-center gap-4">
                            <h3 className="font-bold text-lg l dark:text-white lg:text-xl">
                              {trip.name}
                            </h3>
                          </div>
                          <div className="flex flex-col w-full bg-blue-lagoon-300/10 gap-2 border border-blue-lagoon-200 p-4 shadow-inner rounded-md">
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
                                <p className="lg:text-base lg:text-md flex items-center gap-1">
                                  <Watch className="w-5 h-5 text-blue-lagoon-800 dark:text-white" />
                                  <span className="dark:text-white font-medium">
                                    Llegada:
                                  </span>{" "}
                                  {trip.arrivalTime}
                                  <span>- {trip.to}</span>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button className="">
                                          <AlertCircleIcon className="h-4 w-4 text-yellow-300" />
                                          <span className="sr-only">
                                            Alert Circle
                                          </span>
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>
                                          El horario de llegada estimado es
                                          aproximado y puede variar
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </p>
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
      </div>
    </section>
  );
};

export default MyTrips;
