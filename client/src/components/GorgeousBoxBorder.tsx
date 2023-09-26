import { cn } from "@/lib/utils";

const GorgeousBoxBorder = ({ children, className, ...props }: any) => {
  return (
    <div className={cn("", className)} {...props}>
      <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-400/10 dark:after:shadow-slate-200/20">
        {children}
      </div>
    </div>
  );
};

export default GorgeousBoxBorder;
