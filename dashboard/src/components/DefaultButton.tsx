import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
  loading?: boolean;
  isMaxCapacity?: boolean;
};

const DefaultButton = ({ children, loading, isMaxCapacity }: Props) => {
  return (
    <div className="relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-100/20 dark:after:shadow-highlight dark:after:shadow-slate-100/30 after:transition focus-within:after:shadow-slate-100 dark:focus-within:after:shadow-slate-100 lg:h-8">
      <Button
        disabled={loading || isMaxCapacity}
        className="relative w-full bg-primary text-slate-100 hover:text-white dark:text-slate-100 dark:bg-primary dark:hover:text-white lg:h-8"
      >
        {children}
      </Button>
    </div>
  );
};

export default DefaultButton;
