import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="section hero">
      <div className="flex flex-col items-center gap-5 text-center">
        <h1 className="font-serif tracking-wider text-6xl">
          <span className="font-medium text-[4rem]">F</span>
          <span className="inline-block rotate-3">a</span>
          <span className="inline-block -rotate-6">b</span>
          <span className="inline-block rotate-1">e</span>
          <span className="font-medium text-[4rem]">B</span>
          <span className="inline-block rotate-6">u</span>
          <span className="inline-block -rotate-3">s</span>
        </h1>
        <p className="font-medium dark:text-slate-100">Carmen de Areco</p>
        <p className="font-medium dark:text-slate-100">
          Una empresa familiar con más de 28 años de trayectoria.
        </p>
        <div className="">
          <Button
            onClick={() => navigate("/viajes")}
            className="mt-1 h-10 border border-blue-lagoon-200 bg-blue-lagoon-200/10 hover:bg-white dark:bg-blue-lagoon-800/20 dark:hover:text-white"
          >
            Viajes disponibles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
