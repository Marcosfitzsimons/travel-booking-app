import { X } from "lucide-react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

type TimePickerProps = {
  value: string;
  onChange: any;
};

const TimePickerContainer = ({ onChange, value }: TimePickerProps) => {
  return (
    <div className="flex flex-1 items-center">
      <div
        className="w-full relative before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-blue-lagoon-500/60 before:ring-2 before:ring-blue-lagoon-400/10 before:transition
        after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 focus-within:after:shadow-blue-lagoon-500/60 after:transition dark:focus-within:after:shadow-blue-lagoon-300/40 dark:before:ring-blue-lagoon-500/20 dark:before:border-blue-lagoon-300"
      >
        <TimePicker
          disableClock
          className="w-full px-3.5 py-1.5 relative text-sm rounded-lg border border-border-color bg-white placeholder:text-neutral-600 dark:border-border-color-dark dark:bg-black/80 dark:placeholder:text-blue-lagoon-100 dark:text-blue-lagoon-100 shadow-black/10 !outline-none"
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
