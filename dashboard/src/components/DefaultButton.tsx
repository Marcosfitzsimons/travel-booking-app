import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
  loading?: boolean;
};

const DefaultButton = ({ children, loading }: Props) => {
  return (
    <div className="relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 lg:w-auto lg:h-7">
      <Button
        disabled={loading}
        className="relative w-full bg-[#005f71] text-slate-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-[#005f71] lg:w-auto lg:h-7"
      >
        {children}
      </Button>
    </div>
  );
};

export default DefaultButton;
