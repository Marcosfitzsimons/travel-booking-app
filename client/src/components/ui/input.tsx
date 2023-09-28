import * as React from "react";

import { cn } from "../../lib/utils";
import GorgeousBorder from "../GorgeousBorder";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex flex-1 items-center">
        <GorgeousBorder className="w-full">
          <input
            className={cn(
              "w-full px-3.5 py-2 relative text-sm bg-input-bg rounded-lg border border-slate-400/60 shadow-input placeholder:text-neutral-500 dark:placeholder:text-pink-1-100/70 dark:border-slate-800 dark:text-white dark:shadow-none !outline-none",
              className
            )}
            ref={ref}
            {...props}
          />
        </GorgeousBorder>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
