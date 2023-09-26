import {
  DollarSign,
  CalendarDays,
  Clock,
  MapPin,
  Loader2,
  Check,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Separator } from "./ui/separator";
import CountdownTimer from "./CountdownTimer";
import getTodayDate from "@/lib/utils/getTodayDate";
import formatDate from "@/lib/utils/formatDate";
import { MyTripCardProps } from "@/types/props";
import TripDataBox from "./TripDataBox";
import TripTime from "./TripTime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import moment from "moment";
import TripDate from "./TripDate";
import TodayDate from "./TodayDate";
import GorgeousBoxBorder from "./GorgeousBoxBorder";

const MyTripCard = ({
  _id,
  name,
  date,
  from,
  to,
  departureTime,
  arrivalTime,
  maxCapacity,
  price,
  available,
  setUserTrips,
  userTrips,
}: MyTripCardProps) => {
  const todayDate = getTodayDate();
  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const { toast } = useToast();

  const { auth, setAuth } = useAuth();
  const userId = auth?.user?._id;

  const navigate = useNavigate();

  const handleDelete = async (e: any) => {
    const tripId = e.target.id;
    setLoading(true);
    toast({
      variant: "loading",
      description: (
        <div className="flex gap-1">
          <Loader2 className="h-5 w-5 animate-spin text-purple-900 shrink-0" />
          Cancelando lugar...
        </div>
      ),
    });
    const currentDate = moment();

    // Parse the received date and time
    const receivedDate = moment(date);
    const receivedHour = moment(arrivalTime, "HH:mm");

    // Combine the parsed date and time into a single moment
    receivedDate.set({
      hour: receivedHour.hours(),
      minute: receivedHour.minutes(),
    });

    // Calculate the time difference in hours
    const hoursDifference = receivedDate.diff(currentDate, "hours");

    if (hoursDifference <= 6) {
      return toast({
        variant: "destructive",
        title: (
          <div className="flex gap-1">
            {<X className="h-5 w-5 text-destructive shrink-0" />}Error al
            cancelar lugar
          </div>
        ) as any,
        description:
          "Lo siento, ya no es posible cancelar tu lugar debido a la proximidad del horario de salida del viaje",
      });
    }
    try {
      await axiosPrivate.delete(`/passengers/${userId}/${tripId}`);
      toast({
        description: (
          <div className="flex gap-1">
            {<Check className="h-5 w-5 text-green-600 shrink-0" />} Lugar
            cancelado con éxito
          </div>
        ),
      });
      setUserTrips(userTrips.filter((trip) => trip._id !== tripId));
      setLoading(false);
      setTimeout(() => {
        navigate("/viajes");
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
            cancelar su lugar
          </div>
        ) as any,
        description: err.response?.data?.msg
          ? err.response?.data?.msg
          : "Ha ocurrido un error al cancelar su lugar. Por favor, intentar más tarde",
      });
    }
  };

  return (
    <GorgeousBoxBorder className="w-full max-w-[400px]">
      <article className="group w-full flex justify-center items-center relative mx-auto rounded-lg shadow-input pb-2 max-w-[400px] bg-card border dark:shadow-none">
        <CountdownTimer date={date} departureTime={departureTime} />
        <div className="w-full px-2 pt-9 pb-2 sm:px-4">
          <div className="flex flex-col gap-2">
            <div className="absolute top-[0.75rem] left-2.5 sm:left-4 flex flex-col gap-[3px] transition-transform ">
              <span className="w-8 h-[4px] bg-red-700 rounded-full " />
              <span className="w-4 h-[4px] bg-red-700 rounded-full " />
              <span className="w-2 h-[4px] bg-red-700 rounded-full " />
            </div>
            <div className="absolute right-2 top-2 flex items-center flex-row-reverse gap-2 sm:right-4">
              <TripDate date={formatDate(date)} />
              {formatDate(date) === todayDate && <TodayDate />}
            </div>

            <div className="flex flex-col gap-1 relative">
              <div className="flex flex-col gap-1 mt-2">
                <h3 className="font-bold text-lg lg:text-xl">{name}</h3>
                <h4 className="text-sm font-light text-card-foreground">
                  Información acerca del viaje
                </h4>
              </div>
              <GorgeousBoxBorder>
                <div className="flex flex-col w-full gap-2 border px-2 py-1 shadow-inner rounded-lg dark:bg-[#171717]">
                  <div className="flex flex-col overflow-auto pb-2">
                    <TripDataBox
                      icon={<MapPin className="h-5 w-5 text-accent shrink-0" />}
                      text="Salida"
                    >
                      <div className="flex items-center gap-1">
                        <p>{from}</p>
                        <Separator className="w-2" />
                        <TripTime>{departureTime} hs</TripTime>
                      </div>
                    </TripDataBox>
                    <TripDataBox
                      icon={<MapPin className="h-5 w-5 text-accent shrink-0" />}
                      text="Destino"
                    >
                      <div className="flex items-center gap-1">
                        <p>{to}</p>
                        <Separator className="w-2" />
                        <TripTime>{arrivalTime} hs</TripTime>
                      </div>
                    </TripDataBox>
                    <TripDataBox
                      icon={<DollarSign className="h-5 w-5 text-accent" />}
                      text="Precio"
                    >
                      {price}
                    </TripDataBox>
                  </div>
                </div>
              </GorgeousBoxBorder>
            </div>
            <div className="self-center flex items-center justify-between mt-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="text-red-700 hover:text-red-300"
                  >
                    Cancelar viaje
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no podrá deshacerse. Esto eliminará
                      permanentemente tu lugar en el viaje.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      No, volver a mis viajes
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} id={String(_id)}>
                      Cancelar mi lugar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
        <Separator className="absolute -bottom-5 w-4 self-center" />
      </article>
    </GorgeousBoxBorder>
  );
};

export default MyTripCard;
