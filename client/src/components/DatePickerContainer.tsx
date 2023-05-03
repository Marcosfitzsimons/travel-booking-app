import React from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { CalendarDays } from "lucide-react";

const DatePickerContainer = ({ startDate, setStartDate }: any) => {
  setDefaultLocale("es");
  registerLocale("es", es);

  return (
    <div
      className="relative flex w-full before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-blue-lagoon-400 before:ring-2 before:ring-blue-lagoon-200/50 before:transition
      after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 focus-within:after:shadow-blue-lagoon-400 after:transition dark:focus-within:after:shadow-blue-lagoon-300/40 dark:before:ring-blue-lagoon-500/20 dark:before:border-blue-lagoon-300"
    >
      <CalendarDays className="absolute left-4 top-[9px] w-5 h-5 z-40" />
      <DatePicker
        dateFormat={"dd/MM/yyyy"}
        locale="es"
        className="cursor-pointer w-full pl-10 py-1.5 font-medium rounded-lg border border-border-color bg-white/80 !outline-none p-2 focus:border-blue-lagoon-200/50 placeholder:text-black/80 dark:border-border-color-dark dark:text-white dark:bg-black/40 dark:placeholder:text-neutral-200 dark:focus:border-blue-lagoon-500/20"
        selected={startDate}
        placeholderText="Seleccionar fecha"
        minDate={new Date()}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

export default DatePickerContainer;
