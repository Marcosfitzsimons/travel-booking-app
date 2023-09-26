import { cn } from "@/lib/utils";

const GorgeousBorder = ({ children, className, ...props }: any) => {
  return (
    <div className={cn("", className)} {...props}>
      <div className="relative before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-black/60 before:ring-2 before:ring-slate-400/10 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-400/10 focus-within:after:shadow-black/70 dark:after:shadow-slate-200/20 after:transition dark:focus-within:after:shadow-slate-300/60 dark:before:ring-slate-800/40 dark:before:border-slate-300/60">
        {children}
      </div>
    </div>
  );
};

export default GorgeousBorder;
