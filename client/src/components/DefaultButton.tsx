import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
  loading?: boolean;
  isMaxCapacity?: boolean;
};

const DefaultButton = ({ children, loading, isMaxCapacity }: Props) => {
  return (
    <div className="relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 lg:h-8">
      <Button
        disabled={isMaxCapacity || loading}
        className="relative w-full bg-[#9e4a4f] text-blue-lagoon-100 hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-blue-lagoon-100 dark:hover:text-white dark:bg-[#9e4a4f] lg:h-8"
      >
        {children}
      </Button>
    </div>
  );
};

export default DefaultButton;
