import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Home = () => {
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
        <div className="w-full max-w-md relative  after:absolute after:pointer-events-none after:inset-px after:rounded-[7px] lg:w-56 dark:after:shadow-highlight dark:after:shadow-white/10 after:transition">
          <Button
            variant="default"
            size="lg"
            className="w-full max-w-md relative bg-dark-gray text-base text-white rounded-lg py-6 border border-black/20 lg:w-56 active:scale-100 hover:bg-transparent hover:border-dark-gray hover:text-black  dark:hover:text-white dark:hover:bg-transparent dark:hover:border-white dark:hover:white dark:shadow-input dark:shadow-black/5
             dark:bg-white dark:text-black"
          >
            <Link to="/viajes">Próximos viajes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
