import * as React from "react";

import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex flex-1 items-center">
        <div
          className="w-full max-w-xs relative before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-icon-color before:ring-2 before:ring-blue-lagoon-800/10 before:transition
          after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-gray-700/10 focus-within:after:shadow-icon-color/50 after:transition dark:after:shadow-gray-600/50 dark:focus-within:after:shadow-blue-lagoon-300/60 dark:before:ring-blue-lagoon-800/20 dark:before:border-blue-lagoon-300"
        >
          <input
            className={cn(
              "w-full px-3.5 py-2 relative text-sm rounded-lg border border-icon-color/5 bg-white placeholder:text-neutral-600 dark:border-border-color-dark dark:bg-black/80 dark:placeholder:text-blue-lagoon-100 dark:text-blue-lagoon-100 shadow-input shadow-black/10 !outline-none",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
