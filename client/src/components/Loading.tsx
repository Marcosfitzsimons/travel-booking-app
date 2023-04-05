import { DotWave } from "@uiball/loaders";

const Loading = () => {
  const theme = localStorage.getItem("theme");

  return (
    <div className="w-full my-[13rem] flex items-center justify-center lg:my-[17rem]">
      <DotWave
        size={47}
        speed={1}
        color={theme === "light" ? "#004c5a" : "#e5e5e5"}
      />
    </div>
  );
};

export default Loading;
