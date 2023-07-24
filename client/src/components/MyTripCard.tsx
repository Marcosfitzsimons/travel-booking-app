import moment from "moment";

import {
  DollarSign,
  CalendarDays,
  Clock,
  Bell,
  Check,
  MapPin,
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
import { Button } from "../components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Separator } from "./ui/separator";
import CountdownTimer from "./CountdownTimer";

type MyTripCardProps = {
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
  reminder: boolean;
  handleDelete: (e: any) => void;
};

const MyTripCard = ({
  id,
  name,
  date,
  from,
  to,
  departureTime,
  arrivalTime,
  maxCapacity,
  price,
  available,
  reminder,
  handleDelete,
}: MyTripCardProps) => {
  const todayDate = moment().locale("es").format("ddd DD/MM");
  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

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

  return (
    <article
      key={id}
      className="relative w-full flex justify-center items-center mx-auto rounded-md shadow-input group pb-4 max-w-[400px] bg-card border dark:shadow-none"
    >
      <div className="absolute -z-10 transition-all text-white right-2 pt-[2px] bg-orange-600 rounded-t-md px-2 h-10 -top-[5px] group-hover:-top-[22px] lg:right-4 dark:bg-orange-700">
        <CountdownTimer date={date} departureTime={departureTime} />
      </div>
      <div className="w-full px-2 pt-9 sm:px-4">
        <div className="flex flex-col gap-2">
          <div className="absolute top-[0.75rem] left-2.5 sm:left-4 flex flex-col gap-[3px] transition-transform ">
            <span className="w-8 h-[4px] bg-red-700 rounded-full " />
            <span className="w-4 h-[4px] bg-red-700 rounded-full " />
            <span className="w-2 h-[4px] bg-red-700 rounded-full " />
          </div>
          <div className="absolute right-2 top-2 flex items-center gap-2 sm:right-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    disabled={!reminder}
                    className="w-8 h-8 p-0 cursor-default bg-yellow-200/50 text-yellow-900/80 border border-yellow-900/60 dark:border-yellow-200/70 dark:text-yellow-200/90"
                  >
                    <Bell className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="w-42">
                  <p className="text-xs flex items-center gap-[3px]">
                    Recordatorio activado{" "}
                    <Check className="w-4 h-4 relative top-[1px] text-green-600 " />
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator orientation="vertical" className="h-4" />
            <p className="text-teal-900 order-2 font-medium flex items-center select-none gap-1 rounded-lg border border-slate-800/60 bg-slate-200/30 dark:bg-slate-800/70 dark:border-slate-200/80 dark:text-white px-3">
              <CalendarDays className="w-4 h-4 relative lg:w-5 lg:h-5" />
              {formatDate(date)}
            </p>
            {formatDate(date) === todayDate && (
              <p className="text-green-900 bg-green-300/30 border border-green-800/80 order-1 select-none font-medium rounded-lg dark:bg-[#75f5a8]/20 dark:border-[#86dda9] dark:text-white px-3 py-0">
                HOY
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-6 lg:mt-8">
            <div className="flex flex-col sm:gap-2">
              <h3 className="font-bold text-lg lg:text-xl">{name}</h3>
              <h4 className="text-sm font-light text-card-foreground">
                Información acerca del viaje:
              </h4>
            </div>
            <div className="flex flex-col w-full bg-background gap-2 border px-1 py-4 shadow-inner rounded-md dark:bg-[#171717]">
              <div className="flex flex-col gap-2 overflow-auto">
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-accent shrink-0 " />
                  <span className="dark:text-white font-medium">Salida:</span>
                  <span className="shrink-0">{from}</span>
                  <Separator className="w-2 bg-border" />
                  <Clock className="h-4 w-4 text-accent shrink-0 " />
                  <span className="shrink-0">{departureTime} hs.</span>
                </p>
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-accent shrink-0 " />
                  <span className="dark:text-white font-medium">Destino:</span>
                  <span className="shrink-0">{to}</span>
                  <Separator className="w-2 bg-border" />
                  <Clock className="h-4 w-4 text-accent shrink-0 " />
                  <span className="shrink-0">{arrivalTime} hs.</span>
                </p>
                <p className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-accent " />
                  <span className="dark:text-white font-medium">Precio:</span>
                  <span className="">${price}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="self-center flex items-center justify-between mt-3">
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
                <AlertDialogFooter className="flex flex-col-reverse gap-1 md:flex-row md:justify-end">
                  <AlertDialogCancel className="md:w-auto" asChild>
                    <Button>No, volver a mis viajes</Button>
                  </AlertDialogCancel>
                  <div className="flex w-full items-center z-20 after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white md:w-auto">
                    <AlertDialogAction
                      id={id}
                      onClick={handleDelete}
                      className=""
                      asChild
                    >
                      <Button className="h-10 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white md:w-auto">
                        Si, cancelar mi lugar
                      </Button>
                    </AlertDialogAction>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <Separator className="absolute -bottom-5 w-4 self-center" />
    </article>
  );
};

export default MyTripCard;
