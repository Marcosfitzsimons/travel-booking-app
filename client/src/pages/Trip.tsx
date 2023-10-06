import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import {
  MapPin,
  Milestone,
  Crop,
  User,
  Check,
  X,
  ArrowUp,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DollarSign } from "lucide-react";
import BackButton from "../components/BackButton";
import { Separator } from "../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ToastAction } from "@/components/ui/toast";
import { Checkbox } from "@/components/ui/checkbox";
import CountdownTimer from "@/components/CountdownTimer";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import getTodayDate from "@/lib/utils/getTodayDate";
import { UserAddresses } from "@/types/types";
import formatDate from "@/lib/utils/formatDate";
import sectionVariants from "@/lib/variants/sectionVariants";
import errorVariants from "@/lib/variants/errorVariants";
import SingleTripSkeleton from "@/components/skeletons/SingleTripSkeleton";
import TripTime from "@/components/TripTime";
import TripDataBox from "@/components/TripDataBox";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Error from "@/components/Error";
import TodayDate from "@/components/TodayDate";
import TripDate from "@/components/TripDate";
import GorgeousBoxBorder from "@/components/GorgeousBoxBorder";

const INITIAL_VALUES = {
  _id: "",
  name: "",
  date: "",
  from: "",
  to: "",
  departureTime: "",
  arrivalTime: "",
  price: "",
  image: "",
  maxCapacity: "",
};

const INITIAL_USER_VALUES = {
  addressCda: {
    street: "",
    streetNumber: undefined,
    crossStreets: "",
  },
  addressCapital: "",
};

const Trip = () => {
  const [data, setData] = useState(INITIAL_VALUES);
  const [userInfo, setUserInfo] = useState(INITIAL_USER_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isConfirmError, setIsConfirmError] = useState(false);
  const [addressCapitalValue, setAddressCapitalValue] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const locationn = useLocation();
  const path = locationn.pathname;
  const tripId = path.split("/")[2];

  const { auth, setAuth } = useAuth();
  const user = auth?.user;

  const { toast } = useToast();
  const navigate = useNavigate();

  const todayDate = getTodayDate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      addressCda: {
        street: "",
        streetNumber: null,
        crossStreets: "",
      },
      addressCapital: "",
    },
  });

  const getUserAddresses = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.get(`/users/addresses/${user?._id}`);
      const userData = res.data.userAddresses;
      setUserInfo(userData);
      setLoading(false);
      reset({
        addressCda: {
          street: userData.addressCda.street,
          streetNumber: userData.addressCda.streetNumber,
          crossStreets: userData.addressCda.crossStreets,
        },
      });
      setAddressCapitalValue(userData.addressCapital);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setAuth({ user: null });
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
      setLoading(false);
    }
  };

  // Added endpoint to only manage user addresses updates
  // Old endpoint data transferred: 1.18kb / data size: 927kb
  // Updated endpoint data transferred: 366B / data size: 110B
  const handleOnSubmit = async (data: UserAddresses) => {
    if (!isDirty && addressCapitalValue === userInfo.addressCapital) {
      return toast({
        variant: "destructive",
        description: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Es necesario
            realizar cambios antes de enviar
          </div>
        ),
      });
    }
    setLoading(true);
    toast({
      variant: "loading",
      description: (
        <div className="flex gap-1">
          <Loader2 className="h-5 w-5 animate-spin text-purple-900 shrink-0" />
          Guardando cambios...
        </div>
      ),
    });
    try {
      const res = await axiosPrivate.put(`/users/addresses/${user?._id}`, {
        ...data,
        addressCapital: addressCapitalValue,
      });
      setLoading(false);
      const userUpdated = res.data;
      setUserInfo(userUpdated);
      reset({
        addressCda: {
          street: userUpdated.addressCda.street,
          streetNumber: userUpdated.addressCda.streetNumber,
          crossStreets: userUpdated.addressCda.crossStreets,
        },
      });
      setAddressCapitalValue(userUpdated.addressCapital);
      toast({
        description: (
          <div className="flex gap-1">
            {<Check className="h-5 w-5 text-green-600 shrink-0" />} Cambios
            guardados con éxito
          </div>
        ),
      });
    } catch (err: any) {
      if (err.response?.status === 403) {
        setAuth({ user: null });
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
      const errorMsg = err.response?.data?.msg;
      setAddressCapitalValue(userInfo.addressCapital);
      setLoading(false);
      toast({
        variant: "destructive",
        title: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
            guardar cambios
          </div>
        ) as any,
        description: errorMsg
          ? errorMsg
          : "Ha ocurrido un error al guardar cambios. Por favor, intentar más tarde",
      });
    }
  };

  const handleOnConfirm = () => {
    if (!isConfirm) {
      setIsConfirmError(true);
    } else {
      setIsConfirmError(false);
    }
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    toast({
      variant: "loading",
      description: (
        <div className="flex gap-1">
          <Loader2 className="h-5 w-5 animate-spin text-purple-900 shrink-0" />
          Guardando lugar...
        </div>
      ),
    });
    try {
      const res = await axiosPrivate.post(`/payments`, {
        trip: {
          _id: data._id,
          price: data.price,
        },
        userId: user?._id,
      });
      window.location.href = res.data.init_point;
    } catch (err: any) {
      if (err.response?.status === 403) {
        setAuth({ user: null });
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
      setLoading(false);
      toast({
        variant: "destructive",
        title: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
            guardar su lugar
          </div>
        ) as any,
        action: (
          <ToastAction altText="Mis viajes" asChild>
            <Link to="/mis-viajes">Mis viajes</Link>
          </ToastAction>
        ),
        description: err.response?.data?.msg
          ? err.response?.data?.msg
          : "Ha ocurrido un error al guardar su lugar. Por favor, intentar más tarde",
      });
    }
  };

  const handleConfirmPassenger = async () => {
    setLoading(true);
    toast({
      variant: "loading",
      description: (
        <div className="flex gap-1">
          <Loader2 className="h-5 w-5 animate-spin text-purple-900 shrink-0" />
          Guardando lugar...
        </div>
      ),
    });
    try {
      await axiosPrivate.post(`/passengers/${user?._id}/${tripId}`, {
        userId: user?._id,
      });
      toast({
        title: (
          <div className="flex gap-1">
            {<Check className="h-5 w-5 text-green-600 shrink-0" />} Lugar
            guardado con éxito
          </div>
        ) as any,
        description: (
          <p className="">
            Desde fabebus le deseamos que tenga un muy buen viaje ❤️
          </p>
        ),
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/mis-viajes");
      }, 100);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setAuth({ user: null });
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
      setLoading(false);
      toast({
        variant: "destructive",
        title: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />} Error al
            guardar su lugar
          </div>
        ) as any,
        action: (
          <ToastAction altText="Mis viajes" asChild>
            <Link to="/mis-viajes">Mis viajes</Link>
          </ToastAction>
        ),
        description: err.response?.data?.msg
          ? err.response?.data?.msg
          : "Ha ocurrido un error al guardar su lugar. Por favor, intentar más tarde",
      });
    }
  };

  useEffect(() => {
    getUserAddresses();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get(`/trips/${user?._id}/${tripId}`);
        setData({ ...res.data });
      } catch (err: any) {
        if (err.response?.status === 403) {
          setAuth({ user: null });
          setTimeout(() => {
            navigate("/login");
          }, 100);
        }
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="section">
      <div className="flex flex-col gap-5">
        <div className="relative w-full flex items-center justify-center">
          <div className="absolute left-0">
            <BackButton linkTo="/viajes" />
          </div>
          <SectionTitle>Confirmar lugar</SectionTitle>
        </div>
        {loading ? (
          <SingleTripSkeleton />
        ) : error ? (
          <Error />
        ) : (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <GorgeousBoxBorder className="w-full max-w-[400px] mx-auto">
              <article className="w-full flex justify-center items-center relative mx-auto rounded-lg group shadow-input border max-w-[400px] bg-card dark:shadow-none">
                <CountdownTimer
                  date={data.date}
                  departureTime={data.departureTime}
                />
                <div className="w-full px-2 pt-9 pb-4 sm:px-4">
                  <div className="flex flex-col gap-2">
                    <div className="absolute top-[0.75rem] left-2.5 sm:left-4 flex flex-col gap-[3px] transition-transform ">
                      <span className="w-8 h-[4px] bg-red-700 rounded-full " />
                      <span className="w-4 h-[4px] bg-red-700 rounded-full " />
                      <span className="w-2 h-[4px] bg-red-700 rounded-full " />
                    </div>

                    <div className="absolute right-2 top-2 flex items-center flex-row-reverse gap-2 sm:right-4">
                      <TripDate date={formatDate(data.date)} />
                      {formatDate(data.date) === todayDate && <TodayDate />}
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-lg lg:text-xl">
                          {data.name}
                        </h3>
                        <h4 className="text-sm font-light text-card-foreground">
                          Información acerca del viaje
                        </h4>
                      </div>
                      <GorgeousBoxBorder className="w-full">
                        <div className="flex flex-col w-full gap-2 border px-2 py-1 shadow-inner rounded-lg dark:bg-[#171717]">
                          <div className="flex flex-col overflow-auto pb-2">
                            <TripDataBox
                              icon={
                                <MapPin className="h-5 w-5 text-accent shrink-0" />
                              }
                              text="Salida"
                            >
                              <div className="flex items-center gap-1">
                                <p className="shrink-0">{data.from}</p>
                                <Separator className="w-2" />
                                <TripTime>{data.departureTime} hs</TripTime>
                              </div>
                            </TripDataBox>
                            <TripDataBox
                              icon={
                                <MapPin className="h-5 w-5 text-accent shrink-0" />
                              }
                              text="Destino"
                            >
                              <div className="flex items-center gap-1">
                                <p className="shrink-0">{data.to}</p>
                                <Separator className="w-2" />
                                <TripTime>{data.arrivalTime} hs</TripTime>
                              </div>
                            </TripDataBox>
                            <TripDataBox
                              icon={
                                <DollarSign className="h-5 w-5 text-accent" />
                              }
                              text="Precio"
                            >
                              {data.price}
                            </TripDataBox>
                          </div>
                        </div>
                      </GorgeousBoxBorder>
                    </div>

                    <Separator className="w-4 self-center bg-border mt-1.5 lg:hidden" />

                    <div
                      className={`${
                        isConfirmError && !isConfirm ? "pb-6" : "pb-2"
                      }
                  flex flex-col gap-1`}
                    >
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium flex items-center gap-[2px] dark:text-white">
                          <User className="h-5 w-5 text-accent shrink-0 " />
                          Mis datos para este viaje
                        </h5>

                        <Dialog>
                          <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
                            <DialogTrigger asChild>
                              <Button className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white">
                                Editar
                              </Button>
                            </DialogTrigger>
                          </div>
                          <DialogContent className="">
                            <div className="absolute top-[0.75rem] left-2.5 sm:left-4 flex flex-col gap-[3px] transition-transform ">
                              <span className="w-8 h-[4px] bg-red-700 rounded-full " />
                              <span className="w-4 h-[4px] bg-red-700 rounded-full " />
                              <span className="w-2 h-[4px] bg-red-700 rounded-full " />
                            </div>
                            <div className="absolute bottom-[0.75rem] right-2.5 sm:right-4 flex flex-col rotate-180 gap-[3px]">
                              <span className="w-8 h-[4px] bg-red-700 rounded-full " />
                              <span className="w-4 h-[4px] bg-red-700 rounded-full " />
                              <span className="w-2 h-[4px] bg-red-700 rounded-full " />
                            </div>
                            <AlertDialogHeader className="mt-7">
                              <DialogTitle className="text-center lg:text-2xl">
                                Editar domicilios
                              </DialogTitle>
                              <DialogDescription className="text-center lg:text-lg">
                                Corroborá que los domicilios sean correctos
                              </DialogDescription>
                            </AlertDialogHeader>
                            <form
                              onSubmit={handleSubmit(handleOnSubmit)}
                              className="w-full flex flex-col items-center gap-3 mb-7"
                            >
                              <div className="w-full flex flex-col gap-2 lg:max-w-5xl">
                                <div className="w-full flex flex-col items-center gap-2">
                                  <div className="w-full flex flex-col gap-2 max-w-sm">
                                    <div className="w-full flex flex-col gap-2">
                                      <h6 className="font-serif text-accent ">
                                        Carmen de Areco
                                      </h6>

                                      <div className="flex items-center gap-1 max-w-sm">
                                        <div className="grid w-full items-center gap-2">
                                          <Label htmlFor="street">Calle</Label>
                                          <div className="relative flex items-center">
                                            <Milestone className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                                            <Input
                                              type="text"
                                              id="street"
                                              className="pl-[32px]"
                                              placeholder="Matheu"
                                              {...register(
                                                "addressCda.street",
                                                {
                                                  required: {
                                                    value: true,
                                                    message:
                                                      "Por favor, ingresar domicilio",
                                                  },
                                                  minLength: {
                                                    value: 3,
                                                    message:
                                                      "Domicilio no puede ser tan corto",
                                                  },
                                                  maxLength: {
                                                    value: 20,
                                                    message:
                                                      "Domicilio no puede ser tan largo",
                                                  },
                                                }
                                              )}
                                            />
                                          </div>
                                          {errors.addressCda?.street && (
                                            <p className="text-red-600 text-xs sm:text-sm">
                                              {errors.addressCda.street.message}
                                            </p>
                                          )}
                                        </div>
                                        <div className="grid w-full items-center gap-2">
                                          <Label htmlFor="streetNumber">
                                            Número
                                          </Label>
                                          <div className="relative flex items-center">
                                            <Milestone className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                                            <Input
                                              type="number"
                                              id="streetNumber"
                                              className="pl-[32px]"
                                              placeholder="522"
                                              {...register(
                                                "addressCda.streetNumber",
                                                {
                                                  required: {
                                                    value: true,
                                                    message:
                                                      "Por favor, ingresar número de domicilio",
                                                  },
                                                  minLength: {
                                                    value: 1,
                                                    message:
                                                      "Número de domicilio no puede ser tan corto",
                                                  },
                                                  maxLength: {
                                                    value: 5,
                                                    message:
                                                      "Número de domicilio no puede ser tan largo",
                                                  },
                                                  pattern: {
                                                    value: /^[0-9]+$/,
                                                    message:
                                                      "Debe incluir solo números",
                                                  },
                                                }
                                              )}
                                            />
                                          </div>
                                          {errors.addressCda?.streetNumber && (
                                            <p className="text-red-600 text-xs sm:text-sm">
                                              {
                                                errors.addressCda.streetNumber
                                                  .message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid w-full items-center gap-2">
                                      <Label htmlFor="crossStreets">
                                        Calles que cruzan
                                      </Label>
                                      <div className="relative flex items-center">
                                        <Crop className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
                                        <Input
                                          type="text"
                                          id="crossStreets"
                                          className="pl-[32px]"
                                          placeholder="Matheu y D. Romero"
                                          {...register(
                                            "addressCda.crossStreets",
                                            {
                                              required: {
                                                value: true,
                                                message:
                                                  "Por favor, ingresar las calles que cruzan cerca de ese domicilio",
                                              },
                                              minLength: {
                                                value: 3,
                                                message:
                                                  "No puede ser tan corto",
                                              },
                                              maxLength: {
                                                value: 45,
                                                message:
                                                  "No puede ser tan largo",
                                              },
                                            }
                                          )}
                                        />
                                      </div>
                                      {errors.addressCda?.crossStreets && (
                                        <p className="text-red-600 text-sm">
                                          {
                                            errors.addressCda.crossStreets
                                              .message
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div className="w-full flex flex-col gap-2 max-w-sm">
                                    <h6 className="font-serif text-accent ">
                                      Capital Federal
                                    </h6>
                                    <div className="grid w-full items-center gap-2">
                                      <Label htmlFor="editAddressCapital">
                                        Dirección
                                      </Label>
                                      <div className="w-full">
                                        <AddressAutocomplete
                                          id="editAddressCapital"
                                          value={addressCapitalValue}
                                          setValue={setAddressCapitalValue}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <DialogFooter>
                                <div className="w-full max-w-xs mt-5">
                                  <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
                                    <Button
                                      disabled={loading}
                                      className="h-8 py-2 px-4 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white"
                                    >
                                      Guardar cambios
                                    </Button>
                                  </div>
                                </div>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="flex flex-col px-1 text-sm">
                        <h6 className="font-serif font-semibold">
                          Carmen de Areco
                        </h6>
                        <ul className="flex flex-col">
                          <li className="flex flex-row items-center gap-2">
                            <Milestone className="h-4 w-4 text-accent shrink-0 " />
                            <div className="w-full flex flex-col">
                              <span className="relative top-0.5 text-sm font-medium text-card-foreground">
                                Dirreción
                              </span>
                              {userInfo.addressCda.street}{" "}
                              {userInfo.addressCda.streetNumber}
                            </div>
                          </li>
                          <li className="flex flex-row items-center gap-2">
                            <Crop className="h-4 w-4 text-accent shrink-0 " />

                            <div className="w-full flex flex-col">
                              <span className="relative top-0.5 text-sm font-medium text-card-foreground">
                                Calles que cruzan
                              </span>
                              <span>{userInfo?.addressCda.crossStreets}</span>
                            </div>
                          </li>
                        </ul>
                        <h6 className="font-serif mt-2 dark:text-white font-semibold">
                          Capital Federal
                        </h6>
                        <ul>
                          <li className="flex flex-row items-center gap-2">
                            <Milestone className="h-4 w-4 text-accent shrink-0 " />

                            <div className="w-full flex flex-col">
                              <span className="relative top-0.5 text-sm font-medium text-card-foreground">
                                Dirección
                              </span>
                              <span>{userInfo?.addressCapital}</span>
                            </div>
                          </li>
                        </ul>
                        <div className="relative flex items-center mt-2 space-x-1">
                          <Checkbox
                            id="confirmAddress"
                            checked={isConfirm}
                            onCheckedChange={() =>
                              setIsConfirm((prev) => !prev)
                            }
                          />
                          <label
                            htmlFor="confirmAddress"
                            className="text-sm font-medium  flex items-center gap-[2px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Confirmar domicilios{" "}
                            {isConfirm ? (
                              <Check className="w-4 h-4 relative top-[1px] text-green-600 lg:w-5 lg:h-5" />
                            ) : (
                              <X className="w-4 h-4 relative top-[1.2px] text-red-600 lg:w-5 lg:h-5" />
                            )}
                          </label>
                          {isConfirmError && !isConfirm && (
                            <motion.p
                              variants={errorVariants}
                              initial="hidden"
                              animate="visible"
                              className="absolute flex items-center gap-[2px] -left-1 -bottom-6 text-red-600"
                            >
                              <ArrowUp className="h-4 w-4 animate-bounce shrink-0" />
                              Antes debes confirmar tus domicilios.
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </div>

                    {isConfirmError && !isConfirm ? (
                      <div className="self-end relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 lg:mx-2 lg:h-8 lg:w-auto">
                        <Button
                          onClick={handleOnConfirm}
                          className="relative w-full bg-[#9e4a4f] text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#9e4a4f] lg:h-8 lg:w-auto"
                        >
                          Confirmar
                        </Button>
                      </div>
                    ) : (
                      <Dialog>
                        <div className="self-end relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 lg:mx-2 lg:h-8 lg:w-auto">
                          <DialogTrigger asChild>
                            <Button
                              onClick={handleOnConfirm}
                              className="relative w-full bg-[#9e4a4f] text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#9e4a4f] lg:h-8 lg:w-auto"
                            >
                              Confirmar
                            </Button>
                          </DialogTrigger>
                        </div>
                        <DialogContent className="">
                          <div className="absolute top-[0.75rem] left-2.5 sm:left-4 flex flex-col gap-[3px] transition-transform ">
                            <span className="w-8 h-[4px] bg-red-700 rounded-full " />
                            <span className="w-4 h-[4px] bg-red-700 rounded-full " />
                            <span className="w-2 h-[4px] bg-red-700 rounded-full " />
                          </div>
                          <div className="absolute bottom-[0.75rem] right-2.5 sm:right-4 flex flex-col rotate-180 gap-[3px] transition-transform ">
                            <span className="w-8 h-[4px] bg-red-700 rounded-full " />
                            <span className="w-4 h-[4px] bg-red-700 rounded-full " />
                            <span className="w-2 h-[4px] bg-red-700 rounded-full " />
                          </div>
                          <AlertDialogHeader className="mt-6">
                            <DialogTitle className="text-center lg:text-2xl">
                              Método de pago
                            </DialogTitle>
                            <DialogDescription className="text-center lg:text-lg">
                              Elegí cómo querés pagar tu viaje
                            </DialogDescription>
                          </AlertDialogHeader>
                          <div className="w-full flex flex-col items-center gap-2 lg:max-w-2xl mb-8">
                            <div className="w-full max-w-xs">
                              <div className="relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-100/20 dark:after:shadow-highlight dark:after:shadow-slate-100/30 after:transition focus-within:after:shadow-slate-100 dark:focus-within:after:shadow-slate-100">
                                <Button
                                  disabled={loading}
                                  onClick={handleConfirmPayment}
                                  className="relative w-full bg-primary text-slate-100 hover:text-white dark:text-slate-100 dark:bg-primary dark:hover:text-white h-8"
                                >
                                  Pagar con mercado pago o tarjeta
                                </Button>
                              </div>
                            </div>
                            o
                            <div className="w-full max-w-xs">
                              <div className="relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-100/20 dark:after:shadow-highlight dark:after:shadow-slate-100/30 after:transition focus-within:after:shadow-slate-100 dark:focus-within:after:shadow-slate-100">
                                <Button
                                  disabled={loading}
                                  onClick={handleConfirmPassenger}
                                  className="relative w-full bg-black/80 text-slate-100 hover:text-white dark:text-slate-100 dark:hover:text-white h-8"
                                >
                                  Pagar en efectivo
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </article>
            </GorgeousBoxBorder>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Trip;
