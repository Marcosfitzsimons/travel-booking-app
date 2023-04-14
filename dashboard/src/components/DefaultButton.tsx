import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
};

const DefaultButton = ({ children }: Props) => {
  return (
    <div className="relative w-full after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/20 dark:after:shadow-highlight dark:after:shadow-blue-lagoon-100/20 after:transition focus-within:after:shadow-blue-lagoon-200 dark:focus-within:after:shadow-blue-lagoon-200 lg:max-w-[8rem]">
      <Button className="relative w-full bg-blue-lagoon-500 text-slate-100  hover:text-white dark:shadow-input dark:shadow-black/5 dark:text-slate-100 dark:hover:text-white dark:bg-blue-lagoon-500 lg:max-w-[8rem]">
        {children}
      </Button>
    </div>
  );
};

export default DefaultButton;
