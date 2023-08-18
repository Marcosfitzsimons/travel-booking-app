import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { CalendarDays } from "lucide-react";

const DatePickerContainer = ({ startDate, setStartDate }: any) => {
  setDefaultLocale("es");
  registerLocale("es", es);

  return (
    <div
      className="w-full relative before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-pink-1-800/50 before:ring-2 before:ring-slate-400/10 before:transition
      after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 focus-within:after:shadow-pink-1-700/30 after:transition dark:focus-within:after:shadow-pink-1-300/40 dark:before:ring-slate-800/60 dark:before:border-pink-1-300"
    >
      <CalendarDays className="text-accent absolute left-[15px] top-[8px] w-5 h-5 z-40" />
      <DatePicker
        dateFormat={"EEE dd/MM"}
        locale="es"
        className="capitalize cursor-pointer w-full pl-10 py-1.5 font-medium bg-card rounded-lg border border-slate-800/20 shadow-input placeholder:text-zinc-900 dark:placeholder:text-zinc-300 dark:bg-[hsl(0,0%,11%)] dark:border-slate-800 dark:hover:text-white dark:placeholder:hover:text-white dark:shadow-none !outline-none"
        selected={startDate}
        placeholderText="Seleccionar fecha"
        minDate={new Date()}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

export default DatePickerContainer;
