import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment-timezone";
import "moment/locale/es";
import axios from "axios";
import { specialPassengerColumns } from "../datatablesource";
import BackButton from "../components/BackButton";
import SpecialPassengersDatatable from "../components/SpecialPassengersDatatable";
import {
  CalendarDays,
  Clock,
  DollarSign,
  Heart,
  MapPin,
  UserPlus,
  Users,
} from "lucide-react";
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
import Logo from "../components/Logo";
import TimePickerContainer from "../components/TimePickerContainer";
import { Separator } from "../components/ui/separator";

type SpecialTrip = {
  name: string;
  date: Date | null | undefined;
  from: string;
  departureTime: string;
  to: string;
  maxCapacity: string;
  price: string;
};

type SpecialPassenger = {
  fullName?: string;
  dni?: number;
};

const INITIAL_STATES = {
  _id: "",
  name: "",
  date: null,
  from: "",
  departureTime: "",
  to: "",
  maxCapacity: undefined,
  price: undefined,
  passengers: [],
};

const SingleSpecialTrip = () => {
  const [data, setData] = useState(INITIAL_STATES);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitted2, setIsSubmitted2] = useState(false);
  const [departureTimeValue, setDepartureTimeValue] = useState("10:00");
  const [error, setError] = useState<unknown | boolean>(false);
  const [err, setErr] = useState<null | string>(null);

  const isMaxCapacity = data.passengers.length === data.maxCapacity;

  const todayDate = moment().locale("es").format("ddd DD/MM");

  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });
  let { id } = useParams();
  const { toast } = useToast();

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
      price: "",
      maxCapacity: "",
    },
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({
    defaultValues: {
      fullName: "",
      dni: 0,
    },
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleOnSubmit = async (data: SpecialTrip) => {
    setIsSubmitted(true);
    try {
      await axios.put(
        `https://fabebus-api-example.onrender.com/api/special-trips/${id}`,
        {
          ...data,
          date: startDate,
          departureTime: departureTimeValue,
        },
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

  const handleOnSubmitPassenger = async (data: SpecialPassenger) => {
    setIsSubmitted(true);
    try {
      await axios.post(
        `https://fabebus-api-example.onrender.com/api/special-passengers/${id}`,
        {
          ...data,
        },
        { headers }
      );
      toast({
        description: "Pasajero ha sido creado con éxito.",
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (err: any) {
      console.log(err);
      const errorMsg = err.response.data.err.message;
      setErr(errorMsg);
      toast({
        description: "Error al crear pasajero. Intentar más tarde.",
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

  const handleOnSubmitAnonymousPassenger = async () => {
    setIsSubmitted2(true);
    try {
      await axios.post(
        `https://fabebus-api-example.onrender.com/api/special-passengers/${id}`,
        {},
        { headers }
      );
      toast({
        description: "Pasajero anónimo ha sido creado con éxito.",
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (err: any) {
      console.log(err);
      const errorMsg = err.response.data.err.message;
      setErr(errorMsg);
      toast({
        description: "Error al crear pasajero anónimo. Intentar más tarde.",
      });
    }
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
          `https://fabebus-api-example.onrender.com/api/special-trips/${id}`,
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
          price: tripData.price,
          maxCapacity: tripData.maxCapacity,
        });
        setDepartureTimeValue(tripData.departureTime);
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
        <BackButton linkTo="/special-trips" />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-6">
          <article
            className={`${
              isMaxCapacity ? "dark:border-zinc-800" : "dark:border-zinc-500"
            } w-full flex justify-center items-center relative mx-auto rounded-md shadow-md pb-4 max-w-[400px] bg-white/40 border border-border-color dark:bg-black/60`}
          >
            <div className="w-full px-2 pt-9 sm:px-4">
              <div className="flex flex-col gap-2">
                <div className="absolute top-[.5rem] left-1 sm:left-3">
                  <img
                    src={miniBus}
                    alt="combi"
                    className="w-10 h-9 lg:w-12 lg:h-11 hover:-rotate-12 transition-transform"
                  />
                </div>
                <div className="absolute right-2 top-2 flex items-center gap-2 sm:right-4">
                  <p className="text-teal-900 order-2 font-medium flex items-center select-none gap-1 rounded-lg border border-slate-800/60 bg-slate-200/30 dark:bg-slate-800/70 dark:border-slate-200/80 dark:text-white px-3">
                    <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
                    {data.date}
                  </p>
                  {data.date === todayDate && (
                    <p className="text-green-900 bg-green-300/30 border border-green-800/80 order-1 select-none font-medium rounded-lg dark:bg-[#75f5a8]/20 dark:border-[#86dda9] dark:text-white px-3">
                      HOY
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1 mt-4 lg:mt-7">
                  <div className="flex flex-col sm:gap-2">
                    <h3 className="font-bold text-lg lg:text-xl">
                      {data.name}
                    </h3>
                    <h4 className="text-sm font-light">
                      Información acerca del viaje:
                    </h4>
                  </div>
                  <div className="flex flex-col w-full bg-blue-lagoon-300/10 gap-2 border border-border-color py-4 px-1 shadow-inner rounded-md dark:bg-blue-lagoon-900/5 dark:border-border-color-dark">
                    <div className="flex flex-col gap-2 overflow-auto pb-2">
                      <p className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-blue-lagoon-900/60 shrink-0 dark:text-blue-lagoon-300" />
                        <span className="font-medium shrink-0 dark:text-white">
                          Salida:
                        </span>{" "}
                        <span className="shrink-0">{data.from}</span>
                        <Separator className="w-2 bg-border-color dark:bg-border-color-dark" />
                        <Clock className="h-4 w-4 text-blue-lagoon-900/60 shrink-0 dark:text-blue-lagoon-300" />
                        <span className="shrink-0">
                          {data.departureTime} hs.
                        </span>
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-blue-lagoon-900/60 shrink-0 dark:text-blue-lagoon-300" />
                        <span className="dark:text-white shrink-0 font-medium">
                          Destino:
                        </span>{" "}
                        <span className="shrink-0">{data.to}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
                        <span className="dark:text-white font-medium">
                          Precio:{" "}
                        </span>
                        <span className="">${data.price}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
                        <span className="dark:text-white font-medium">
                          Capacidad máxima:
                        </span>{" "}
                        {data.maxCapacity}
                      </p>
                    </div>
                  </div>

                  <Dialog>
                    <div className="lg:flex lg:items-center lg:justify-end">
                      <div className="mt-2 relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 lg:w-auto lg:h-[31px]">
                        <DialogTrigger className="relative w-full rounded-lg px-6 py-1.5 lg:py-0 bg-[#9e4a4f] text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#9e4a4f] lg:w-auto lg:h-[31px]">
                          Editar
                        </DialogTrigger>
                      </div>
                    </div>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center text-2xl lg:text-3xl">
                          Editar viaje
                        </DialogTitle>
                        <DialogDescription className="text-center lg:text-lg">
                          Hace cambios en el viaje.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="w-full flex flex-col items-center gap-5">
                        <div className="w-full flex flex-col items-center gap-5">
                          <form
                            key={1}
                            onSubmit={handleSubmit(handleOnSubmit)}
                            className="w-full flex flex-col items-center gap-3"
                          >
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
                            <div className="w-full flex flex-col max-w-md gap-2">
                              <div className="grid w-full items-center gap-2">
                                <Label htmlFor="departureTime">
                                  Horario de salida:
                                </Label>
                                <TimePickerContainer
                                  value={departureTimeValue}
                                  onChange={setDepartureTimeValue}
                                />
                              </div>
                              {err && (
                                <p className="text-red-600 self-start">{err}</p>
                              )}{" "}
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
                            {err && (
                              <p className="text-red-600 self-start">{err}</p>
                            )}
                            <DialogFooter>
                              <div className="w-[min(28rem,100%)] flex justify-center">
                                <DefaultButton loading={isSubmitted}>
                                  Guardar cambios
                                </DefaultButton>
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
            {isMaxCapacity && (
              <p className="absolute px-4 py-4 font-medium order-3 flex flex-col items-center justify-center select-none gap-2 rounded-lg bg-white border border-border-color dark:border-zinc-500 dark:bg-black dark:text-white">
                <Logo />
                <span>¡Combi completa!</span>
                <span className="flex items-center gap-1">
                  <Heart
                    className="w-4 h-4 relative top-[1px] dark:text-black"
                    fill="red"
                  />
                </span>
              </p>
            )}
          </article>
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-between items-end">
              <h3 className="font-bold text-xl uppercase dark:text-white lg:text-2xl">
                Pasajeros:
              </h3>
              <div className="flex flex-col items-end gap-1 sm:flex-row sm:gap-2">
                <div className="flex items-center gap-1 text-sm lg:text-base">
                  <Users className="animate-pulse text-blue-lagoon-900/60 h-4 w-4 lg:w-5 lg:h-5 dark:text-blue-lagoon-300" />
                  <p className="font-medium">Pasajeros:</p>
                  <p className="font-light flex items-center lg:gap-1">
                    {data.passengers.length}/{data.maxCapacity}
                  </p>
                </div>
                <div className="w-full flex items-center justify-end relative">
                  <div className="flex items-center relative">
                    {isMaxCapacity ? (
                      <p className="text-green-900 bg-green-300/30 border order-2 border-green-800/80 select-none font-medium rounded-md dark:bg-[#75f5a8]/30 dark:border-[#4ca770] dark:text-white px-1">
                        Combi completa
                      </p>
                    ) : (
                      <Dialog>
                        <div className="lg:flex lg:items-center lg:justify-end">
                          <DialogTrigger className="mt-2 flex items-center px-3.5 py-1 pl-[37px] z-20 rounded-md border border-teal-800 bg-teal-800/60 text-white font-semibold transition-colors hover:border-black dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500">
                            <UserPlus className="absolute cursor-pointer left-[15px] h-5 w-5" />
                            Agregar pasajero
                          </DialogTrigger>
                        </div>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-center text-2xl lg:text-3xl">
                              Agregar pasajero
                            </DialogTitle>
                            <DialogDescription className="text-center lg:text-lg">
                              Información acerca del pasajero
                            </DialogDescription>
                          </DialogHeader>
                          <div className="w-full flex flex-col items-center gap-5">
                            <div className="w-full flex flex-col items-center gap-5">
                              <form
                                key={2}
                                onSubmit={handleSubmit2(
                                  handleOnSubmitPassenger
                                )}
                                className="w-full flex flex-col items-center gap-3"
                              >
                                <div className="grid w-full max-w-md items-center gap-2">
                                  <Label htmlFor="fullName">
                                    Nombre completo
                                  </Label>
                                  <Input
                                    type="text"
                                    id="fullName"
                                    {...register2("fullName", {
                                      required: {
                                        value: true,
                                        message:
                                          "Por favor, ingresar nombre completo.",
                                      },
                                      minLength: {
                                        value: 3,
                                        message:
                                          "Nombre completo no puede ser tan corto.",
                                      },
                                      maxLength: {
                                        value: 25,
                                        message:
                                          "Nombre completo no puede ser tan largo.",
                                      },
                                    })}
                                  />
                                  {errors2.fullName && (
                                    <p className="text-red-600">
                                      {errors2.fullName.message}
                                    </p>
                                  )}
                                </div>
                                <div className="grid w-full max-w-md items-center gap-2">
                                  <Label htmlFor="dni">DNI</Label>
                                  <Input
                                    type="number"
                                    id="dni"
                                    {...register2("dni", {
                                      required: {
                                        value: true,
                                        message: "Por favor, ingresar DNI.",
                                      },
                                    })}
                                  />
                                  {errors2.fullName && (
                                    <p className="text-red-600">
                                      {errors2.fullName.message}
                                    </p>
                                  )}
                                </div>

                                {err && (
                                  <p className="text-red-600 self-start">
                                    {err}
                                  </p>
                                )}
                                <DialogFooter>
                                  <div className="w-[min(28rem,100%)] flex justify-center">
                                    <DefaultButton loading={isSubmitted}>
                                      Crear pasajero
                                    </DefaultButton>
                                  </div>
                                </DialogFooter>
                              </form>
                            </div>
                          </div>
                          <div className="w-full flex flex-col items-center gap-5">
                            <p className="text-center">o</p>
                            <div
                              className="w-auto"
                              onClick={handleOnSubmitAnonymousPassenger}
                            >
                              <DefaultButton loading={isSubmitted2}>
                                Crear pasajero anónimo
                              </DefaultButton>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {data.passengers && data.passengers.length > 0 ? (
              <SpecialPassengersDatatable
                tripPassengers={data.passengers}
                columns={specialPassengerColumns}
                tripId={id}
              />
            ) : (
              <div className="mx-auto flex flex-col items-center gap-3">
                <p>El viaje no tiene pasajeros por el momento.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleSpecialTrip;