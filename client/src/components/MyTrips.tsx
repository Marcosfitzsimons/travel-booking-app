import { Heart, X, ClipboardList, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { toast } from "../hooks/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import MyTripCard from "./MyTripCard";
import { Button } from "./ui/button";
import { useToast } from "./../components/ui/use-toast";
import { CheckCircle } from "lucide-react";
import { ToastAction } from "./ui/toast";

type TripProps = {
  id: string;
  name: string;
  date: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  maxCapacity: number;
  price: number;
  available: boolean;
};

type addressCda = {
  street: string;
  streetNumber: number | undefined;
  crossStreets: string;
};

type UserData = {
  _id: string;
  fullName: string;
  username: string;
  addressCda: addressCda;
  addressCapital: string;
  dni: number | undefined;
  phone: undefined | number;
  email: string;
  image?: string;
  myTrips: TripProps[];
  isReminder: boolean;
};
interface myTripsProps {
  userTrips: TripProps[];
  userData: UserData;
  setIsUserInfo: (value: boolean) => void;
}

const tripVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    y: 0,
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

const MyTrips = ({ userTrips, userData, setIsUserInfo }: myTripsProps) => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [err, setErr] = useState<null | string>(null);
  const [reminder, setReminder] = useState(userData.isReminder);
  const [isUnsaved, setIsUnsaved] = useState(false);

  const { toast } = useToast();

  const userId = userData._id;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (e: any) => {
    setLoading(true);
    const tripId = e.target.id;
    try {
      await axios.delete(
        `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
        { headers }
      );
      toast({
        description: (
          <div className="flex items-center gap-1">
            {<CheckCircle className="w-[15px] h-[15px]" />} Lugar cancelado con
            éxito.
          </div>
        ),
      });
      setLoading(false);
      setIsUserInfo(false);
      navigate("/viajes");
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      setErr(err.message);
      toast({
        variant: "destructive",
        title: "Error al guardar su lugar",
        description: err.response.data.msg
          ? err.response.data.msg
          : "Error al guardar lugar, intente más tarde.",
      });
    }
  };

  const handleCheckedChange = () => {
    setReminder((prev) => !prev);
    setIsUnsaved(true);
  };

  const handleIsReminder = async () => {
    setIsSubmitted(true);
    try {
      const res = await axios.put(
        `https://fabebus-api-example.onrender.com/api/users/${userData._id}`,
        { userData: { isReminder: reminder } },
        { headers }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      setIsSubmitted(false);
      setIsUnsaved(false);
      toast({
        description: "Cambios guardados con éxito.",
      });
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setIsSubmitted(false);
      setErr(errorMsg);
      toast({
        variant: "destructive",
        description: "Error al guardar los cambios, intentar mas tarde.",
      });
    }
  };

  return (
    <section className="min-h-[70vh] w-full mx-auto mt-3 bg-transparent flex flex-col gap-5 items-center">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="">
            {userTrips && userTrips.length > 0 ? (
              <div className="flex flex-col items-center gap-3">
                <p className="flex items-center gap-1 ">
                  <Heart
                    className="w-4 h-4 relative top-[1px] dark:text-black"
                    fill="red"
                  />
                  Gracias por viajar con nosotros
                  <Heart
                    className="w-4 h-4 relative top-[1px] dark:text-black"
                    fill="red"
                  />
                </p>

                <div
                  className={` ${
                    reminder ? "border-[#5FC488] dark:border-[#6cd395]" : ""
                  } w-full relative flex flex-col gap-3 p-4 shadow-input rounded-md bg-card border dark:shadow-none`}
                >
                  <Label htmlFor="airplane-mode dark:text-white">
                    🔔 Activar recordatorio previo al viaje
                  </Label>

                  <div className="flex items-center gap-1">
                    <Switch
                      id="airplane-mode"
                      checked={reminder}
                      onCheckedChange={handleCheckedChange}
                      className={
                        reminder ? "bg-[#5FC488] dark:bg-[#6cd395]" : ""
                      }
                    />
                    {reminder ? (
                      <span className="text-xs flex items-center gap-[3px]">
                        Recordatorio activado{" "}
                        <Check className="w-4 h-4 relative top-[1px] text-green-600 lg:w-5 lg:h-5" />
                      </span>
                    ) : (
                      <span className="text-xs flex items-center gap-[3px]">
                        Recordatorio desactivado{" "}
                        <X className="w-4 h-4 relative top-[1.2px] text-red-600 lg:w-5 lg:h-5" />
                      </span>
                    )}
                  </div>
                  {isUnsaved ? (
                    <div className="w-auto flex flex-col items-center gap-2">
                      <Separator orientation="horizontal" className="w-4" />
                      <div className="relative h-7 after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-100/20 dark:after:shadow-highlight dark:after:shadow-slate-100/30 after:transition focus-within:after:shadow-slate-100 dark:focus-within:after:shadow-slate-100 ">
                        <Button
                          onClick={handleIsReminder}
                          disabled={isSubmitted}
                          className="relative h-7 bg-primary text-slate-100 hover:text-white dark:text-slate-100 dark:bg-primary dark:hover:text-white "
                        >
                          Guardar cambios
                        </Button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <Separator className="w-4" />
          <h4 className="flex items-center gap-1 font-medium text-xl dark:text-white self-start lg:text-2xl">
            <ClipboardList className="h-5 w-5 text-accent  lg:w-6 lg:h-6" />
            Mis viajes:
          </h4>
          <motion.div
            variants={tripVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col items-center gap-10 md:gap-5 md:grid md:justify-items-center md:grid-cols-2"
          >
            {userTrips && userTrips.length > 0 ? (
              <>
                {userTrips.map((trip: TripProps) => (
                  <MyTripCard
                    {...trip}
                    reminder={reminder}
                    handleDelete={handleDelete}
                  />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 md:col-start-1 md:col-end-3">
                <p>No tenes lugares reservados.</p>
                <div
                  className="relative after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 h-8"
                  onClick={() => navigate("/viajes")}
                >
                  <Button className="relative bg-[#9e4a4f] text-slate-100  hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#9e4a4f] h-8">
                    Reservar ahora
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </section>
  );
};

export default MyTrips;
