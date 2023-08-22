import { Clock } from "lucide-react";

type TripTimeProps = {
  children: React.ReactNode;
};

const TripTime = ({ children }: TripTimeProps) => {
  return (
    <p className="flex items-center text-sm px-2 py-0.5 select-none gap-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/60">
      <Clock className="h-4 w-4 shrink-0 " />
      {children}
    </p>
  );
};

export default TripTime;
