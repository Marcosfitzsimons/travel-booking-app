import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="z-50 bg-[#fafafa] dark:bg-[#0d0f12] border-b border-b-blue-lagoon-700/50 dark:border-b-neutral-600">
      <div className="w-[min(90%,1200px)] mx-auto py-[12.5px] flex justify-between items-center">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
