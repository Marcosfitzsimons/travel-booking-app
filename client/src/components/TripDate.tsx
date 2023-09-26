import { CalendarDays } from "lucide-react";
import GorgeousBorder from "./GorgeousBorder";

interface TripDateProps {
  date: string | null | undefined;
}

const TripDate = ({ date }: TripDateProps) => {
  return (
    <GorgeousBorder>
      <p className="h-7 text-teal-900 font-medium py-0.5 flex items-center select-none gap-1 rounded-lg border border-slate-800/60 bg-slate-200/30 dark:bg-slate-800/70 dark:border-slate-700/80 dark:text-white px-3">
        <CalendarDays className="w-5 h-5" />
        {date}
      </p>
    </GorgeousBorder>
  );
};

export default TripDate;
