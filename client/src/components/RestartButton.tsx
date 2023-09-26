import { RotateCcw } from "lucide-react";
import GorgeousBorder from "./GorgeousBorder";
import { Button } from "./ui/button";

interface RestartButtonProps {
  setStartDate: any;
}

const RestartButton = ({ setStartDate }: RestartButtonProps) => {
  return (
    <GorgeousBorder>
      <Button
        className="w-[38px] h-full p-0 aspect-square flex items-center justify-center cursor-pointer bg-input rounded-lg border border-slate-400/60 shadow-input dark:border-slate-800 dark:shadow-none !outline-none dark:bg-input dark:hover:text-white"
        onClick={() => setStartDate(null)}
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
    </GorgeousBorder>
  );
};

export default RestartButton;
