import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { saveAs } from "file-saver";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Download } from "lucide-react";
import logo from "../assets/fabebus-logo.jpg";
import { convertToArgentineTimezone } from "@/lib/utils/convertToArgentineTimezone";
import { PublicationProps } from "@/types/props";
import GorgeousBoxBorder from "./GorgeousBoxBorder";

const PublicationCard = ({
  title,
  description,
  subtitle,
  image,
  createdAt,
}: PublicationProps) => {
  moment.locale("es", {
    weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  });

  const { datePart, timePart } = convertToArgentineTimezone(createdAt);

  const downloadImage = () => {
    saveAs(image ?? "", "fabebus-img.jpg");
  };

  return (
    <GorgeousBoxBorder className="w-full max-w-lg">
      <article className="w-full relative h-32 max-w-lg bg-card shadow-input rounded-lg border px-2 py-3 flex flex-col gap-3 lg:px-4 lg:pt-[10px] dark:shadow-none">
        <Dialog>
          <div className="flex items-center absolute self-center bottom-2 right-2 z-20 sm:right-4 after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
            <DialogTrigger asChild>
              <Button className="h-8 py-2 px-3 outline-none inline-flex items-center justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white">
                Ver más
              </Button>
            </DialogTrigger>
          </div>

          <DialogContent className="py-12 gap-6 sm:max-w-[600px]">
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
            <DialogHeader className="relative">
              <p className="absolute right-0 top-0 text-sm lg:right-4">
                {datePart}
                <span className="text-[#737373] text-xs font-extralight dark:text-slate-500">
                  {timePart}
                </span>
              </p>
              <div className="flex items-center gap-2 py-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={logo}
                    alt="fabebus"
                    className="border rounded-full"
                  />
                  <AvatarFallback>Fabebus</AvatarFallback>
                </Avatar>
                <p className="text-black font-medium dark:text-white">
                  Fabebus
                </p>
              </div>

              <DialogTitle>{title}</DialogTitle>
              <DialogDescription asChild>
                {subtitle && <h4 className="">{subtitle}</h4>}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <p className="text-card-foreground">{description}</p>
              {image && (
                <div className="relative flex flex-col">
                  <img src={image} alt="imagen adjunta" />
                  <div className="flex items-center absolute bottom-2 right-2 after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 after:transition focus-within:after:shadow-slate-400 dark:after:shadow-highlight dark:after:shadow-zinc-500/50 dark:focus-within:after:shadow-slate-100 dark:hover:text-white">
                    <Button
                      onClick={downloadImage}
                      className="h-8 py-2 px-3 outline-none inline-flex items-center gap-1 justify-center text-sm font-medium transition-colors rounded-lg shadow-input bg-card border border-slate-800/20 hover:bg-white dark:text-neutral-200 dark:border-slate-800 dark:hover:bg-black dark:shadow-none dark:hover:text-white"
                    >
                      Descargar
                      <Download className="w-[14px] h-[14px] cursor-pointer" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <div className="overflow-hidden flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={logo}
                alt="fabebus"
                className="border border-border-color rounded-full"
              />
              <AvatarFallback>Fabebus</AvatarFallback>
            </Avatar>
            <p className="text-black font-medium dark:text-white">Fabebus</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium lg:text-lg dark:text-white">{title}</h3>
            {subtitle && (
              <h4 className="text-card-foreground text-sm lg:text-base">
                {subtitle}
              </h4>
            )}
          </div>
          <p className="text-card-foreground">{description}</p>

          {image && (
            <div className="relative after:bg-gradient-to-b after:from-transparent after:to-black/5 after:inset-0 after:absolute after:z-10 dark:after:to-black/20">
              <img src={image} className="" alt="imagen adjunta" />
            </div>
          )}
          <p className="absolute right-2 top-1 text-sm lg:right-4">
            {datePart}
            <span className="text-[#737373] text-xs font-extralight dark:text-slate-500 ">
              {timePart}
            </span>
          </p>
        </div>
      </article>
    </GorgeousBoxBorder>
  );
};

export default PublicationCard;
