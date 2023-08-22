import { DataBoxProps } from "@/types/props";
import { Separator } from "./ui/separator";

const DataBox = ({ icon, text, children }: DataBoxProps) => {
  return (
    <li className="flex flex-row items-center gap-3 py-1">
      {icon}
      <div className="w-full flex flex-col">
        <span className="relative top-0.5 text-sm font-medium text-card-foreground">
          {text}
        </span>
        <div>{children}</div>
        <Separator className="mt-2" />
      </div>
    </li>
  );
};

export default DataBox;
