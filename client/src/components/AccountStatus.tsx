import { AccountStatusProps } from "@/types/props";
import GorgeousBoxBorder from "./GorgeousBoxBorder";

const AccountStatus = ({ children, isActive }: AccountStatusProps) => {
  return (
    <GorgeousBoxBorder>
      <p className="flex items-center gap-1 bg-background px-4 py-0.5 rounded-lg select-none border text-sm text-slate-800 dark:text-slate-200">
        <span
          className={`w-[10px] aspect-square rounded-full ${
            isActive ? "bg-green-600" : "bg-orange-600"
          } animate-pulse`}
        />
        {children}
      </p>
    </GorgeousBoxBorder>
  );
};

export default AccountStatus;
