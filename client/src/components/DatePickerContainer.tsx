import React from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { CalendarDays } from "lucide-react";

const DatePickerContainer = ({ startDate, setStartDate }) => {
  setDefaultLocale("es");
  registerLocale("es", es);

  const highlightSelectedDate = {
    backgroundColor: "#007287",
    fontWeight: "bold",
    color: "#000000",
  };
  return (
    <div
      className="relative flex items-center w-full before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-blue-lagoon-500 before:ring-2 before:ring-blue-lagoon-400/10 before:transition
after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 focus-within:after:shadow-blue-lagoon-300/40 after:transition dark:focus-within:after:shadow-blue-lagoon-300/40 dark:before:ring-blue-lagoon-500/20 dark:before:border-blue-lagoon-300"
    >
      {startDate && (
        <CalendarDays className="absolute left-3 w-5 h-5 z-40 dark:text-white" />
      )}
      <DatePicker
        dateFormat={"dd/MM/yyyy"}
        locale="es"
        className={`cursor-pointer w-full ${
          startDate ? "pl-10" : ""
        } font-medium rounded-lg border border-blue-lagoon-100/50 bg-white/80 shadow-input !outline-none shadow-blue-lagoon-500/10 dark:border-blue-lagoon-800/20 p-2 placeholder:text-blue-lagoon-700 dark:text-white dark:bg-blue-lagoon-300/10 dark:placeholder:text-white`}
        selected={startDate}
        placeholderText="Seleccionar fecha"
        minDate={new Date()}
        InputProps={{
          style: startDate ? highlightSelectedDate : {},
        }}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

export default DatePickerContainer;
