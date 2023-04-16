import { ChevronsUp, User, Map, DollarSign, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type WidgetProps = {
  type: string;
};

const INITIAL_STATES = {
  title: "",
  isMoney: false,
  link: "",
  to: "",
  icon: <HelpCircle />,
};

const Widget = ({ type }: WidgetProps) => {
  const [data, setData] = useState(INITIAL_STATES);
  // temporarty
  const amount = 100;
  const diff = 20;
  const positive = true;

  useEffect(() => {
    switch (type) {
      case "user":
        setData({
          title: "Usuarios",
          isMoney: false,
          link: "Ver todos los usuarios",
          to: "/users",
          icon: <User />,
        });
        break;
      case "trip":
        setData({
          title: "Viajes",
          isMoney: false,
          link: "Ver todos los viajes",
          to: "/trips",
          icon: <Map />,
        });
        break;
    }
  }, [type]);

  return (
    <article className="w-full flex justify-between gap-5 flex-1 p-5 rounded-md shadow-md bg-white/80 border border-blue-lagoon-500/20 lg:max-w-md dark:bg-[#141414] dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300">
      <div className="flex flex-col gap-4 justify-between">
        <span className="font-bold text-blue-lagoon-600 uppercase dark:text-white">
          {data.title}
        </span>
        <span className="font-light text-2xl">
          {data.isMoney && "$"} {amount}
        </span>
        <Link to={data.to} className="underline rounded-md">
          {data.link}
        </Link>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div
          className={`flex items-center ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          <ChevronsUp className="shrink-0" />
          <span className="shrink-0">{diff}%</span>
        </div>
        {data.icon}
      </div>
    </article>
  );
};

export default Widget;
