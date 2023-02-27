import { Button } from "../components/ui/button";

const Home = () => {
  return (
    <div className="section hero hidden">
      <div className="flex flex-col items-center gap-5 text-center">
        <h1 className="text-6xl font-medium font-serif">
          <span className="text-red">F</span>a
          <span className="inline-block -rotate-12">b</span>e
          <span className="text-red">B</span>
          <span className="inline-block rotate-6">u</span>
          <span className="inline-block -rotate-6">s</span>
        </h1>
        <p className="font-medium dark:text-slate-100">Carmen de Areco</p>
        <p className="font-medium dark:text-slate-100">
          Somos una empresa familiar con más de 28 años de trayectoria.
        </p>
        <Button>Viajes</Button>
      </div>
    </div>
  );
};

export default Home;
