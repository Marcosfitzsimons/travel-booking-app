import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment-timezone";
import "moment/locale/es";
import axios from "axios";
import { passengerColumns } from "../datatablesource";
import BackButton from "../components/BackButton";
import PassengersDatatable from "../components/PassengersDatatable";
import { CalendarDays, Clock, DollarSign, UserPlus, Users } from "lucide-react";
import miniBus from "../assets/minibus1-sm.png";
import SectionTitle from "../components/SectionTitle";
import Loading from "../components/Loading";
import DefaultButton from "../components/DefaultButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "../hooks/ui/use-toast";
import DatePickerContainer from "../components/DatePickerContainer";

type Trip = {
  name: string;
  date: Date | null | undefined;
  from: string;
  departureTime: string;
  to: string;
  arrivalTime: string;
  maxCapacity: string;
  price: string;
};

const INITIAL_STATES = {
  _id: "",
  name: "",
  date: null,
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
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);
  const [err, setErr] = useState<null | string>(null);

  let { id } = useParams();
  const { toast } = useToast();

  moment.locale("es");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      from: "",
      date: null,
      to: "",
      departureTime: "",
      arrivalTime: "",
      price: "",
      maxCapacity: "",
    },
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleOnSubmit = async (data: Trip) => {
    try {
      await axios.put(
        `https://travel-booking-api-production.up.railway.app/api/trips/${id}`,
        { ...data, date: startDate },
        { headers }
      );
      toast({
        description: "Viaje ha sido editado con éxito.",
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (err: any) {
      console.log(err);
      const errorMsg = err.response.data.err.message;
      setErr(errorMsg);
      toast({
        description: "Error al editar viaje. Intentar más tarde.",
      });
    }
  };

  const formatDate = (date: string) => {
    const momentDate = moment.utc(date);
    const timezone = "America/Argentina/Buenos_Aires";
    const timezone_date = momentDate.tz(timezone);
    const formatted_date = timezone_date.format("ddd DD/MM");
    // with more info: const formatted_date = timezone_date.format("ddd  DD/MM/YYYY HH:mm:ss [GMT]Z (z)");
    return formatted_date;
  };

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

        formatDate(res.data.date);
        setData({ ...res.data, date: formatDate(res.data.date) });
        const tripData = { ...res.data };
        reset({
          name: tripData.name,
          from: tripData.from,
          date: tripData.date,
          to: tripData.to,
          departureTime: tripData.departureTime,
          arrivalTime: tripData.arrivalTime,
          price: tripData.price,
          maxCapacity: tripData.maxCapacity,
        });
      } catch (err) {
        setError(err);
        console.log(err);
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <article className="w-full relative mx-auto rounded-md shadow-md mb-10 pb-2 max-w-sm bg-white/40 border border-border-color  dark:bg-black/40 dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300">
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
                  <p className="font-medium flex items-center select-none gap-1 px-2 rounded-2xl shadow-sm border border-blue-lagoon-200 bg-red-600/30 border-red-600/40  dark:bg-red-900/20 dark:border-red-500/60 dark:text-white">
                    <CalendarDays className="w-4 h-4 relative bottom-[1px]" />
                    {data.date}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-4 lg:mt-7">
                  <div className="flex items-center gap-4">
                    <h3 className="font-bold text-lg l dark:text-white lg:text-xl">
                      {data.name}
                    </h3>
                  </div>
                  <div className="flex flex-col w-full bg-blue-lagoon-300/10 gap-2 border border-blue-lagoon-700/50 p-4 shadow-inner rounded-md dark:bg-blue-lagoon-900/5 dark:border-blue-lagoon-300/80">
                    <div className="flex flex-col gap-2">
                      <p className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-lagoon-800 dark:text-white" />
                        <span className="dark:text-white font-medium">
                          Salida:
                        </span>{" "}
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

                  <Dialog>
                    <div className="lg:flex lg:items-center lg:justify-end">
                      <div className="relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 lg:w-auto lg:h-7">
                        <DialogTrigger className="relative w-full rounded-lg px-6 py-1.5 lg:py-0 bg-[#A72F35] text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#A72F35] lg:w-auto lg:h-7">
                          Editar
                        </DialogTrigger>
                      </div>
                    </div>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-2xl lg:text-3xl">
                          Editar viaje
                        </DialogTitle>
                        <DialogDescription className="lg:text-lg">
                          Hace cambios en el viaje.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="w-full flex flex-col items-center gap-5">
                        <div className="w-full flex flex-col items-center gap-5">
                          <form
                            onSubmit={handleSubmit(handleOnSubmit)}
                            className="w-full flex flex-col items-center gap-3"
                          >
                            <div className="grid w-full max-w-md items-center gap-2">
                              <Label htmlFor="name">Nombre del viaje</Label>
                              <Input
                                type="text"
                                id="name"
                                {...register("name", {
                                  required: {
                                    value: true,
                                    message:
                                      "Por favor, ingresar nombre del viaje.",
                                  },
                                  minLength: {
                                    value: 3,
                                    message:
                                      "Nombre del viaje no puede ser tan corto.",
                                  },
                                  maxLength: {
                                    value: 30,
                                    message:
                                      "Nombre del viaje no puede ser tan largo.",
                                  },
                                })}
                              />
                              {errors.name && (
                                <p className="text-red-600">
                                  {errors.name.message}
                                </p>
                              )}
                            </div>

                            <div className="grid w-full max-w-md items-center gap-2">
                              <Label htmlFor="date">Fecha</Label>
                              <DatePickerContainer
                                setStartDate={setStartDate}
                                id="date"
                                startDate={startDate}
                              />
                            </div>
                            <div className="grid w-full max-w-md items-center gap-2">
                              <Label htmlFor="to">Hasta</Label>
                              <Input
                                type="text"
                                id="to"
                                {...register("to", {
                                  required: {
                                    value: true,
                                    message:
                                      "Por favor, ingresar lugar de llegada.",
                                  },
                                  minLength: {
                                    value: 3,
                                    message:
                                      "Lugar de llegada no puede ser tan corto.",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "Lugar de llegada no puede ser tan largo.",
                                  },
                                })}
                              />
                              {errors.to && (
                                <p className="text-red-600">
                                  {errors.to.message}
                                </p>
                              )}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-2">
                              <Label htmlFor="departureTime">
                                Horario de salida
                              </Label>
                              <Input
                                type="text"
                                id="departureTime"
                                {...register("departureTime", {
                                  required: {
                                    value: true,
                                    message:
                                      "Por favor, ingresar horario de salida.",
                                  },
                                  minLength: {
                                    value: 3,
                                    message:
                                      "Horario de salida no puede ser tan corto.",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "Horario de salida no puede ser tan largo.",
                                  },
                                })}
                              />
                              {errors.departureTime && (
                                <p className="text-red-600">
                                  {errors.departureTime.message}
                                </p>
                              )}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-2">
                              <Label htmlFor="arrivalTime">
                                Horario de llegada
                              </Label>
                              <Input
                                type="text"
                                id="arrivalTime"
                                {...register("arrivalTime", {
                                  required: {
                                    value: true,
                                    message:
                                      "Por favor, ingresar horario de llegada.",
                                  },
                                  minLength: {
                                    value: 3,
                                    message:
                                      "Horario de llegada no puede ser tan corto.",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "Horario de llegada no puede ser tan largo.",
                                  },
                                })}
                              />
                              {errors.arrivalTime && (
                                <p className="text-red-600">
                                  {errors.arrivalTime.message}
                                </p>
                              )}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-2">
                              <Label htmlFor="price">Precio</Label>
                              <Input
                                type="number"
                                id="price"
                                {...register("price", {
                                  required: {
                                    value: true,
                                    message:
                                      "Por favor, ingresar precio/persona del viaje.",
                                  },
                                })}
                              />
                              {errors.price && (
                                <p className="text-red-600">
                                  {errors.price.message}
                                </p>
                              )}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-2">
                              <Label htmlFor="maxCapacity">
                                Capacidad máxima
                              </Label>
                              <Input
                                type="number"
                                id="maxCapacity"
                                {...register("maxCapacity", {
                                  required: {
                                    value: true,
                                    message:
                                      "Por favor, ingresar precio/persona del viaje.",
                                  },
                                })}
                              />
                              {errors.maxCapacity && (
                                <p className="text-red-600">
                                  {errors.maxCapacity.message}
                                </p>
                              )}
                            </div>
                            {err && (
                              <p className="text-red-600 self-start">{err}</p>
                            )}
                            <DialogFooter>
                              <div className="w-[min(28rem,100%)] flex justify-center">
                                <DefaultButton>Guardar cambios</DefaultButton>
                              </div>
                            </DialogFooter>
                          </form>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </article>
          <div className="w-full flex justify-between items-end">
            <h3 className="font-bold text-blue-lagoon-600 uppercase dark:text-white">
              Pasajeros:
            </h3>
            <div className="flex flex-col items-end gap-1 sm:flex-row sm:gap-2">
              <div className="flex items-center gap-1 text-sm lg:text-base">
                <Users className="animate-pulse h-4 w-4 lg:w-5 lg:h-5" />
                <p className="font-medium">Pasajeros:</p>
                <p className="font-light flex items-center lg:gap-1">
                  {data.passengers.length}/{data.maxCapacity}
                </p>
              </div>
              <div className="w-full flex items-center justify-end relative">
                <div className="flex items-center relative">
                  <UserPlus className="absolute cursor-pointer left-3 h-5 w-5" />
                  <Link
                    to={`/passengers/newPassenger/${id}`}
                    className="px-3 py-1 pl-9 z-20 bg-transparent rounded-md border border-blue-lagoon-200 shadow-md hover:border-blue-lagoon-600/50 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:bg-[#141414] dark:hover:border-blue-lagoon-300/80 dark:bg-blue-lagoon-300/10"
                  >
                    Agregar pasajero
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {data.passengers && data.passengers.length > 0 ? (
            <PassengersDatatable
              tripPassengers={data.passengers}
              columns={passengerColumns}
              tripId={id}
            />
          ) : (
            <div className="mx-auto flex flex-col items-center gap-3">
              <p>El viaje no tiene pasajeros por el momento.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default SingleTrip;
