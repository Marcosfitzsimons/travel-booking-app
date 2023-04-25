import { X } from "lucide-react";
import { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const TimePickerContainer = () => {
  const [value, onChange] = useState("10:00");
  console.log(value);
  return (
    <div className="flex flex-1 items-center">
      <div
        className="w-full relative before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-blue-lagoon-500 before:ring-2 before:ring-blue-lagoon-400/10 before:transition
    after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 focus-within:after:shadow-blue-lagoon-200/40 after:transition dark:focus-within:after:shadow-blue-lagoon-300/40 dark:before:ring-blue-lagoon-500/20 dark:before:border-blue-lagoon-300"
      >
        <TimePicker
          disableClock
          className="w-full px-3.5 py-2 relative text-sm rounded-lg border border-blue-lagoon-700/50 bg-white placeholder:text-blue-lagoon-600 dark:border-blue-lagoon-500/20 dark:bg-black/80 dark:placeholder:text-blue-lagoon-100 dark:text-blue-lagoon-100 shadow-input shadow-black/10 !outline-none"
          onChange={onChange}
          clearIcon={<X className="w-4 h-4" />}
          required
          value={value}
        />
      </div>
    </div>
  );
};

export default TimePickerContainer;
