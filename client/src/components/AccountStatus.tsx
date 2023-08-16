import { AccountStatusProps } from "@/types/props";

const AccountStatus = ({ children, isActive }: AccountStatusProps) => {
  return (
    <p className="flex items-center gap-1 px-4 py-0.5 rounded-md bg-card border text-sm text-slate-800 dark:text-slate-200">
      <span
        className={`w-[10px] aspect-square rounded-full ${
          isActive ? "bg-green-600" : "bg-orange-600"
        } animate-pulse`}
      />
      {children}
    </p>
  );
};

export default AccountStatus;
