import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { CalendarDays } from "lucide-react";
import GorgeousBorder from "./GorgeousBorder";

const DatePickerContainer = ({ startDate, setStartDate }: any) => {
  setDefaultLocale("es");
  registerLocale("es", es);

  return (
    <GorgeousBorder className="w-full">
      <CalendarDays className="absolute left-3 top-2 z-40 w-5 h-5 text-accent" />
      <DatePicker
        dateFormat={"EEE dd/MM"}
        locale="es"
        className="capitalize cursor-pointer w-full bg-input-bg pl-[38px] py-1.5 font-medium rounded-lg border border-slate-400/60 shadow-input placeholder:text-foreground dark:border-slate-800 dark:text-white dark:placeholder:hover:text-white dark:shadow-none !outline-none"
        selected={startDate}
        placeholderText="Seleccionar fecha"
        minDate={new Date()}
        onChange={(date) => setStartDate(date)}
      />
    </GorgeousBorder>
  );
};

export default DatePickerContainer;
