import GorgeousBorder from "./GorgeousBorder";

const TodayDate = () => {
  return (
    <GorgeousBorder>
      <p className="h-7 flex items-center text-green-900 bg-green-300/30 border border-green-800/80 select-none font-medium rounded-lg dark:bg-[#75f5a8]/20 dark:border-[#a0eebf] dark:text-white px-2">
        HOY
      </p>
    </GorgeousBorder>
  );
};

export default TodayDate;
