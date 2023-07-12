import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/SectionTitle";
import {
  CalendarDays,
  MapPin,
  Clock,
  Milestone,
  Crop,
  User,
  CheckCircle,
  Check,
  X,
  ArrowUp,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Loading from "../components/Loading";
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

type addressCda = {
  street: string;
  streetNumber: any;
  crossStreets: string;
};

type UserData = {
  addressCda: addressCda;
  addressCapital: string;
};
interface InputValidation {
  required: {
    value: boolean;
    message: string;
  };
  minLength: {
    value: number;
    message: string;
  };
  maxLength: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}

interface UserInput {
  id: any;
  label: string;
  type: string;
  placeholder?: string;
  validation?: InputValidation;
  icon?: any;
}

type ProfileProps = {
  setIsUserInfo: (value: boolean) => void;
};

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

const errorVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

const Trip = ({ setIsUserInfo }: ProfileProps) => {
  const [data, setData] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isConfirmError, setIsConfirmError] = useState(false);

  const userAddressRef = useRef<HTMLInputElement>(null);

  const locationn = useLocation();
  const path = locationn.pathname;
  const tripId = path.split("/")[2];

  const { user } = useContext(AuthContext);

  const [userAddressValue, setUserAddressValue] = useState(
    user?.addressCapital
  );

  const { toast } = useToast();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const todayDate = moment().locale("es").format("ddd DD/MM");
  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleOnSubmit = async (data: UserData) => {
    setLoading(true);

    try {
      const res = await axios.put(
        `https://fabebus-api-example.onrender.com/api/users/${user?._id}`,
        { userData: { ...data, addressCapital: userAddressValue } },
        { headers }
      );
      console.log(res);
      setLoading(false);
      setDialogVisible((prev) => !prev);
      localStorage.setItem("user", JSON.stringify(res.data));
      toast({
        description: (
          <div className="flex items-center gap-1">
            {<CheckCircle className="w-[15px] h-[15px]" />} Cambios guardados
            con éxito
          </div>
        ),
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      console.log(errorMsg);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error al guardar cambios",
        description: err.response.data.msg
          ? err.response.data.msg
          : "Error al guardar cambios, intente más tarde.",
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
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
    try {
      const res = await axios.post(
        `https://fabebus-api-example.onrender.com/api/payments`,
        {
          trip: {
            _id: data._id,
            price: data.price,
          },
          userId: user?._id,
        },
        { headers }
      );
      console.log(res);
      window.location.href = res.data.init_point;
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      toast({
        variant: "destructive",
        title: "Error al guardar su lugar",
        action: (
          <ToastAction altText="Mis viajes" asChild>
            <Link to="/mi-perfil" onClick={() => setIsUserInfo(false)}>
              Mis viajes
            </Link>
          </ToastAction>
        ),
        description: err.response.data.msg
          ? err.response.data.msg
          : "Error al guardar lugar, intente más tarde.",
      });
    }
  };

  const handleConfirmPassenger = async () => {
    setLoading(true);
    try {
      await axios.post(
        `https://fabebus-api-example.onrender.com/api/passengers/${user?._id}/${tripId}`,
        {
          userId: user?._id,
        },
        { headers }
      );
      toast({
        description: (
          <div className="flex items-center gap-1">
            {<CheckCircle className="w-[15px] h-[15px]" />} Lugar guardado con
            éxito.
          </div>
        ),
      });
      setLoading(false);
      setIsUserInfo(false);
      navigate("/mi-perfil");
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      toast({
        variant: "destructive",
        title: "Error al guardar su lugar",
        action: (
          <ToastAction altText="Mis viajes" asChild>
            <Link to="/mi-perfil" onClick={() => setIsUserInfo(false)}>
              Mis viajes
            </Link>
          </ToastAction>
        ),
        description: err.response.data.msg
          ? err.response.data.msg
          : "Error al guardar lugar, intente más tarde.",
      });
    }
  };

  const formatDate = (date: string) => {
    moment.locale("es", {
      weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    });
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
        const res = await axios.get(
          `https://fabebus-api-example.onrender.com/api/trips/${tripId}`
        );

        setData({ ...res.data });
        reset({
          addressCda: {
            street: user?.addressCda.street,
            streetNumber: user?.addressCda.streetNumber,
            crossStreets: user?.addressCda.crossStreets,
          },
        });
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userAddress = new window.google.maps.places.Autocomplete(
      userAddressRef.current!,
      {
        componentRestrictions: { country: "AR" },
        types: ["address"],
        fields: ["address_components"],
      }
    );

    userAddress.addListener("place_changed", () => {
      const place = userAddress.getPlace();
      console.log(place);
    });
  }, [dialogVisible]);

  const userAddressInputs = [
    {
      id: "street",
      icon: (
        <Milestone className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
      ),
      label: "Calle",
      type: "text",
      placeholder: "Matheu",
      validation: {
        required: {
          value: true,
          message: "Por favor, ingresar domicilio.",
        },
        minLength: {
          value: 3,
          message: "Domicilio no puede ser tan corto.",
        },
        maxLength: {
          value: 25,
          message: "Domicilio no puede ser tan largo.",
        },
      },
    },
    {
      id: "streetNumber",
      icon: (
        <Milestone className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
      ),
      label: "Número",
      type: "text",
      placeholder: "354",
      validation: {
        required: {
          value: true,
          message: "Por favor, ingresar número de domicilio ",
        },
        minLength: {
          value: 1,
          message: "Número de domicilio no puede ser tan corto.",
        },
        maxLength: {
          value: 5,
          message: "Número de domicilio no puede ser tan largo.",
        },
        pattern: {
          value: /^[0-9]+$/,
          message: "Debe incluir solo números.",
        },
      },
    },
    {
      id: "crossStreets",
      icon: (
        <Crop className="z-30 h-[18px] w-[18px] text-accent absolute left-[10px] pb-[2px] " />
      ),
      label: "Calles que cruzan",
      type: "text",
      placeholder: "Matheu y D. Romero",
      validation: {
        required: {
          value: true,
          message:
            "Por favor, ingresar las calles que cruzan cerca de ese domicilio.",
        },
        minLength: {
          value: 3,
          message: "No puede ser tan corto.",
        },
        maxLength: {
          value: 40,
          message: "No puede ser tan largo.",
        },
      },
    },
  ];

  return (
    <section className="section">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col gap-3"
      >
        <div className="self-start mt-4">
          <BackButton toProfile={false} />
        </div>
        <SectionTitle>Confirmar lugar</SectionTitle>

        {loading ? (
          <Loading />
        ) : (
          <article className="w-full flex justify-center items-center relative mx-auto rounded-md shadow-input border pb-4 max-w-[400px] bg-card dark:shadow-none">
            <div className="w-full px-2 pt-9 pb-4 sm:px-4">
              <div className="flex flex-col gap-2 ">
                <div className="absolute top-[0.75rem] left-2.5 sm:left-4 flex flex-col gap-[3px] transition-transform ">
                  <span className="w-8 h-[4px] bg-red-700 rounded-full " />
                  <span className="w-4 h-[4px] bg-red-700 rounded-full " />
                  <span className="w-2 h-[4px] bg-red-700 rounded-full " />
                </div>

                <div className="absolute right-2 top-2 flex items-center gap-2 sm:right-4">
                  <p className="text-teal-900 order-2 font-medium flex items-center shadow-input select-none gap-1 rounded-lg border border-slate-800/60 bg-slate-200/30 px-3 dark:bg-slate-800/70 dark:border-slate-200/80 dark:text-white dark:shadow-none">
                    <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
                    {formatDate(data.date)}
                  </p>
                  {formatDate(data.date) === todayDate && (
                    <p className="order-1 text-green-900 bg-green-300/30 border border-green-800/80  shadow-input select-none font-medium rounded-lg px-3 dark:bg-[#75f5a8]/20 dark:border-[#86dda9] dark:text-white dark:shadow-none">
                      HOY
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1 mt-6 lg:mt-8">
                  <div className="flex flex-col sm:gap-2">
                    <h3 className="font-bold text-lg lg:text-xl">
                      {data.name}
                    </h3>
                    <h4 className="text-sm font-light">
                      Información acerca del viaje:
                    </h4>
                  </div>
                  <div className="flex flex-col w-full bg-background gap-2 border px-1 py-4 shadow-inner rounded-md dark:bg-[#171717]">
                    <div className="flex flex-col gap-2 overflow-auto pb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-accent shrink-0 " />
                        <span className="dark:text-white font-medium">
                          Salida:
                        </span>{" "}
                        <span className="shrink-0">{data.from}</span>
                        <Separator className="w-2 bg-border-color dark:bg-border-color-dark" />
                        <Clock className="h-4 w-4 text-accent shrink-0 " />
                        <span className="shrink-0">
                          {data.departureTime} hs.
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-accent shrink-0 " />
                        <span className="dark:text-white font-medium">
                          Destino:
                        </span>{" "}
                        <span className="shrink-0">{data.to}</span>
                        <Separator className="w-2 bg-border-color dark:bg-border-color-dark" />
                        <Clock className="h-4 w-4 text-accent shrink-0 " />
                        <span className="shrink-0">{data.arrivalTime} hs.</span>
                      </div>
                      <p className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-accent " />
                        <span className="dark:text-white font-medium">
                          Precio:{" "}
                        </span>
                        ${data.price}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator className="w-4 self-center mt-2 bg-border lg:hidden" />
                <div
                  className={`${isConfirmError && !isConfirm ? "pb-6" : "py-2"}
                  flex flex-col gap-1`}
                >
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium flex items-center gap-[2px] dark:text-white">
                      <User className="h-5 w-5 text-accent shrink-0 " />
                      Mis datos para este viaje
                    </h5>

                    <Dialog
                      open={dialogVisible}
                      onOpenChange={() => setDialogVisible((prev) => !prev)}
                    >
                      <div className="flex items-center relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
                        <DialogTrigger asChild>
                          <Button className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white">
                            Editar
                          </Button>
                        </DialogTrigger>
                      </div>
                      <DialogContent>
                        <AlertDialogHeader>
                          <DialogTitle className="text-center lg:text-2xl">
                            Editar domicilios
                          </DialogTitle>
                          <DialogDescription className="text-center lg:text-lg">
                            Corroborá que los domicilios sean correctos
                          </DialogDescription>
                        </AlertDialogHeader>
                        <form
                          onSubmit={handleSubmit(handleOnSubmit)}
                          className="w-full flex flex-col items-center gap-3"
                        >
                          <div className="w-full flex flex-col items-center gap-2 lg:max-w-2xl">
                            <div className="w-full max-w-xs flex flex-col items-center lg:gap-2 lg:max-w-5xl lg:flex-row lg:items-start">
                              <div className="w-full flex flex-col gap-2">
                                <h6 className="font-serif text-accent ">
                                  Carmen de Areco
                                </h6>
                                {userAddressInputs.map((input: UserInput) => {
                                  const key = input.id;
                                  const fieldName: any = `addressCda.${key}`;
                                  return (
                                    <div
                                      key={input.id}
                                      className="grid w-full items-center gap-2"
                                    >
                                      <Label htmlFor={input.id}>
                                        {input.label}
                                      </Label>
                                      <div className="relative flex items-center">
                                        {input.icon}
                                        <Input
                                          type={input.type}
                                          id={input.id}
                                          placeholder={input.placeholder}
                                          className="pl-[32px]"
                                          {...register(
                                            fieldName,
                                            input.validation
                                          )}
                                        />
                                        {errors[
                                          input.id as keyof typeof errors
                                        ] && (
                                          <p className="text-red-600">
                                            {
                                              errors[
                                                input.id as keyof typeof errors
                                              ]?.message
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <Separator className="w-4 mb-2 mt-4 bg-border md:hidden" />

                              <div className="w-full flex flex-col gap-2">
                                <h6 className="font-serif text-accent ">
                                  Capital Federal
                                </h6>
                                <div className="grid w-full items-center gap-2">
                                  <Label htmlFor="userAddress">Dirección</Label>
                                  <div className="relative flex items-center">
                                    <Milestone className="z-30 h-5 w-5 text-accent absolute left-[10px] pb-[2px] " />
                                    <Input
                                      ref={userAddressRef}
                                      type="text"
                                      id="userAddress"
                                      className="pl-[32px]"
                                      value={userAddressValue}
                                      onChange={(e) =>
                                        setUserAddressValue(e.target.value)
                                      }
                                      placeholder="Las Heras 2304"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <div className="w-full max-w-xs">
                              <div className="relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-100/20 dark:after:shadow-highlight dark:after:shadow-slate-100/30 after:transition focus-within:after:shadow-slate-100 dark:focus-within:after:shadow-slate-100">
                                <Button
                                  disabled={loading}
                                  className="relative w-full bg-primary text-slate-100 hover:text-white dark:text-slate-100 dark:bg-primary dark:hover:text-white h-7"
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
                  <div className="flex flex-col gap-1 px-1 text-sm">
                    <h6 className="font-serif dark:text-white font-semibold">
                      Carmen de Areco:
                    </h6>
                    <div className="flex items-center gap-[2px] ">
                      <Milestone className="w-4 h-4 text-accent " />
                      <span className="font-medium dark:text-white">
                        Dirreción:
                      </span>
                      {user && (
                        <p>{`${user.addressCda.street} ${user.addressCda.streetNumber}`}</p>
                      )}
                    </div>
                    {user && (
                      <div className="flex items-center gap-[2px]">
                        <Crop className="w-4 h-4 text-accent " />
                        <span className="font-medium dark:text-white">
                          Calles que cruzan:
                        </span>{" "}
                        {user.addressCda.crossStreets}
                      </div>
                    )}
                    <h6 className="font-serif dark:text-white font-semibold">
                      Capital Federal:
                    </h6>
                    <div className="flex items-center gap-[2px]">
                      <Milestone className="w-4 h-4 text-accent " />
                      <span className="font-medium dark:text-white">
                        Dirreción:
                      </span>{" "}
                      <p>{user && user.addressCapital}</p>
                    </div>
                    <div className="relative flex items-center mt-2 space-x-1">
                      <Checkbox
                        id="confirmAddress"
                        checked={isConfirm}
                        onCheckedChange={() => setIsConfirm((prev) => !prev)}
                      />
                      <label
                        htmlFor="confirmAddress"
                        className="text-sm font-medium flex items-center gap-[2px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                          <ArrowUp className="h-4 w-4 animate-pulse shrink-0" />
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
                    <DialogContent>
                      <AlertDialogHeader>
                        <DialogTitle className="text-center lg:text-2xl">
                          Método de pago
                        </DialogTitle>
                        <DialogDescription className="text-center lg:text-lg">
                          Elegí como queres pagar tu viaje
                        </DialogDescription>
                      </AlertDialogHeader>
                      <div className="w-full flex flex-col items-center gap-2 lg:max-w-2xl">
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
        )}
      </motion.div>
    </section>
  );
};

export default Trip;
