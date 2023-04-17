import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import SectionTitle from "../components/SectionTitle";
import { passengerColumns } from "../datatablesource";
import BackButton from "../components/BackButton";
import PassengersDatatable from "../components/PassengersDatatable";
import {
  CalendarDays,
  Clock,
  DollarSign,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import moment from "moment-timezone";
import miniBus from "../assets/minibus1-sm.png";

const INITIAL_STATES = {
  _id: "",
  name: "",
  date: "",
  from: "",
  available: true,
  departureTime: "",
  to: "",
  arrivalTime: "",
  maxCapacity: undefined,
  price: undefined,
  passengers: [],
};

const SingleTrip = () => {
  const [data, setData] = useState(INITIAL_STATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `https://travel-booking-api-production.up.railway.app/api/trips/${id}`,
          {
            headers,
          }
        );
        const momentDate = moment.utc(res.data.date).add(1, "day").toDate();
        const newDate = moment.tz(momentDate, "America/Argentina/Buenos_Aires");
        const formattedDate = moment(newDate).format("DD/MM/YY");
        setData({ ...res.data, date: formattedDate });
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col gap-3">
      <SectionTitle>Información del viaje:</SectionTitle>
      <div className="self-start mb-2">
        <BackButton linkTo="/trips" />
      </div>
      <article className="w-full relative mx-auto bg-white/80 rounded-md border border-blue-lagoon-500/20 shadow-md mb-10 pb-2 max-w-md dark:bg-[#141414] dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300">
        <div className="px-4 pt-9 pb-4">
          <div className="flex flex-col gap-2">
            <div className="absolute top-[.6rem] left-5">
              <img
                src={miniBus}
                alt="combi"
                className="w-10 h-9 lg:w-12 lg:h-11"
              />
            </div>
            <div className="absolute right-4 top-2 flex items-center gap-2">
              <p className="font-medium flex items-center select-none gap-1 px-2 rounded-2xl bg-blue-lagoon-300/10 shadow-sm border border-blue-lagoon-200 dark:bg-blue-lagoon-900/70 dark:border-blue-lagoon-400 dark:text-white">
                <CalendarDays className="w-4 h-4 relative bottom-[1px]" />{" "}
                {data.date}
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-4 lg:mt-7">
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-lg l dark:text-white lg:text-xl">
                  {data.name}
                </h3>
              </div>
              <div className="flex flex-col w-full bg-blue-lagoon-300/10 gap-2 border border-blue-lagoon-700/50 p-4 shadow-inner rounded-md dark:bg-blue-lagoon-700/10 dark:border-blue-lagoon-300">
                <div className="flex flex-col gap-2">
                  <p className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-lagoon-800 dark:text-white" />
                    <span className="dark:text-white font-medium">Salida:</span>{" "}
                    {data.departureTime}
                    <span>- {data.from}</span>
                  </p>
                  {data.arrivalTime && (
                    <div className=" flex items-center gap-1">
                      <p className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-lagoon-800 dark:text-white" />
                        <span className="dark:text-white font-medium">
                          Llegada:
                        </span>{" "}
                        {data.arrivalTime}
                        <span>- {data.to}</span>
                      </p>
                    </div>
                  )}
                  <p className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-blue-lagoon-800 dark:text-white" />
                    <span className="dark:text-white font-medium">
                      Precio:{" "}
                    </span>
                    ${data.price}
                  </p>
                  <p className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-lagoon-800 dark:text-white" />
                    <span className="dark:text-white font-medium">
                      Capacidad máxima:
                    </span>{" "}
                    {data.maxCapacity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className="w-full flex items-center justify-end">
        <div className="relative">
          <UserPlus className="absolute cursor-pointer left-3 top-[2px] h-5 w-5" />
          <Link
            to="/passengers/new"
            className="px-3 py-1 pl-9 rounded-md border border-blue-lagoon-200 shadow-md bg-white hover:border-blue-lagoon-600/50 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:bg-[#141414] dark:hover:border-blue-lagoon-300/80"
          >
            Agregar pasajero
          </Link>
        </div>
      </div>
      <article className="p-5 rounded-md shadow-md bg-white/80 border border-blue-lagoon-500/20 dark:bg-[#141414] dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300">
        <h3 className="font-bold text-blue-lagoon-600 uppercase dark:text-white mb-4">
          Pasajeros:
        </h3>

        {data.passengers && data.passengers.length > 0 ? (
          <PassengersDatatable
            tripPassengers={data.passengers}
            columns={passengerColumns}
          />
        ) : (
          <div className="mx-auto flex flex-col items-center gap-3">
            <p>El viaje no tiene pasajeros por el momento.</p>
          </div>
        )}
      </article>
    </section>
  );
};

export default SingleTrip;
