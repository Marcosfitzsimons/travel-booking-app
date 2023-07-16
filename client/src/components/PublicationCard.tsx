import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronsDown, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Separator } from "./ui/separator";
import logo from "../assets/fabebus-logo.jpg";

interface PublicationProps {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  createdAt: string;
}

const PublicationCard = ({
  _id,
  title,
  description,
  subtitle,
  image,
  createdAt,
}: PublicationProps) => {
  const convertToArgentineTimezone = (dateStr: string) => {
    const utcDate = moment.utc(dateStr);

    // Use moment.format to display the date in the desired format
    const formattedDate = utcDate.format("ddd DD/MM - hh:mm A");

    const datePart = formattedDate.slice(0, 10); // "Dom 16/07"
    const timePart = formattedDate.slice(12); // "04:20 PM"

    return { datePart, timePart };
  };

  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

  const { datePart, timePart } = convertToArgentineTimezone(createdAt);
  return (
    <article className="w-full relative h-60 overflow-hidden max-w-lg bg-card shadow-input rounded-md border px-2 pt-3 pb-10 flex flex-col gap-3 lg:px-4 lg:pt-[10px]">
      {/* Change to Dialog with single publication information */}
      <Dialog>
        <div className="flex items-center absolute self-center bottom-1 after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
          <DialogTrigger asChild>
            <Button className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white">
              Ver más
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="pt-12 gap-6 sm:max-w-[425px]">
          <DialogHeader className="relative">
            <p className="absolute right-0 top-0 text-sm lg:right-4">
              {datePart}
              <span className="text-[#737373] text-xs font-extralight dark:text-slate-500 ">
                {timePart}
              </span>
            </p>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={logo}
                  alt="fabebus"
                  className="border border-border-color rounded-full"
                />
                <AvatarFallback>Fabebus</AvatarFallback>
              </Avatar>
              <p className="text-black font-medium dark:text-white">
                Fabebus{" "}
                <span className="text-[#737373] font-extralight dark:text-slate-500 text-sm">
                  @fabebus
                </span>
              </p>
            </div>

            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {subtitle && <h4>{subtitle}</h4>}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {image && (
              <div className="relative flex flex-col">
                <img src={image} alt="imagen adjunta" />
                <div className="flex items-center absolute bottom-2 right-2 after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
                  <Button className="h-8 py-2 px-3 outline-none inline-flex items-center gap-1 justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white">
                    Descargar
                    <Download className="w-[14px] h-[14px] cursor-pointer" />
                  </Button>
                </div>

                <p className="flex items-center  "></p>
              </div>
            )}
            <p className="text-slate-600 dark:text-slate-400">{description}</p>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={logo}
            alt="fabebus"
            className="border border-border-color rounded-full"
          />
          <AvatarFallback>Fabebus</AvatarFallback>
        </Avatar>
        <p className="text-black font-medium dark:text-white">
          Fabebus{" "}
          <span className="text-[#737373] font-extralight dark:text-slate-500 text-sm">
            @fabebus
          </span>
        </p>
      </div>
      <div className="flex flex-col">
        <h3 className="font-medium text-lg dark:text-white">{title}</h3>
        {subtitle && <h4>{subtitle}</h4>}
      </div>

      {image && <img src={image} alt="imagen adjunta" />}
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
      <p className="absolute right-2 top-1 text-sm lg:right-4">
        {datePart}
        <span className="text-[#737373] text-xs font-extralight dark:text-slate-500 ">
          {timePart}
        </span>
      </p>
    </article>
  );
};

export default PublicationCard;
