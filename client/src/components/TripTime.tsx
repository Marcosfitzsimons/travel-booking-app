import { Clock } from "lucide-react";

type TripTimeProps = {
  children: React.ReactNode;
};

const TripTime = ({ children }: TripTimeProps) => {
  return (
    <p className="flex items-center text-sm px-2 select-none shrink-0 gap-1 rounded-lg bg-indigo-100 dark:bg-indigo-300/20">
      <Clock className="h-4 w-4 shrink-0" />
      {children}
    </p>
  );
};

export default TripTime;
