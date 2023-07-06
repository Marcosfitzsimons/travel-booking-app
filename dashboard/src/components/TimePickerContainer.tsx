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
      <div className="relative w-full before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-pink-1-800/50 before:ring-2 before:ring-slate-400/10 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 focus-within:after:shadow-pink-1-700/30 after:transition dark:focus-within:after:shadow-pink-1-300/40 dark:before:ring-slate-800/60 dark:before:border-pink-1-300">
        <TimePicker
          disableClock
          className="w-full px-3.5 py-1.5 relative text-sm bg-card rounded-lg border border-slate-800/20 shadow-input placeholder:text-foreground dark:bg-[hsl(0,0%,11%)] dark:border-slate-800 dark:placeholder:text-zinc-300 dark:text-zinc-300 dark:placeholder:hover:text-white dark:hover:text-white dark:shadow-none !outline-none"
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
