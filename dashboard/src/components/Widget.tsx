import { ChevronsUp, User, Map, DollarSign, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

type WidgetProps = {
  type: string;
};

const INITIAL_STATES = {
  title: "",
  isMoney: false,
  link: "",
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
          icon: <User />,
        });
        break;
      case "trip":
        setData({
          title: "Viajes",
          isMoney: false,
          link: "Ver todos los viajes",
          icon: <Map />,
        });
        break;
      case "earning":
        setData({
          title: "Ganancias",
          isMoney: true,
          link: "Ver ganancias",
          icon: <DollarSign />,
        });
        break;
    }
  }, [type]);

  return (
    <article className="flex justify-between gap-5 flex-1 p-5 border h-40">
      <div className="flex flex-col gap-4 justify-between">
        <span className="font-bold text-blue-lagoon-800/30 uppercase">
          {data.title}
        </span>
        <span className="font-light text-2xl">
          {data.isMoney && "$"} {amount}
        </span>
        <span>{data.link}</span>
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
