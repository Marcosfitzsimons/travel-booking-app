import { DataBoxProps } from "@/types/props";

const TripDataBox = ({ icon, text, children }: DataBoxProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {icon}
      <div className="w-full flex flex-col">
        <span className="relative top-0.5 text-sm font-medium text-card-foreground">
          {text}
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default TripDataBox;
