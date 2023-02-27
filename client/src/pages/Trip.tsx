import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Trip = () => {
  return (
    <section className="section">
      <div className="">
        <h2 className="text-3xl font-medium">Confirmar lugar</h2>
        <div className="w-10/12 mx-auto mt-6 p-3 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center text-center dark:bg-[#262626] dark:border-zinc-700">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">De Carmen a Capital</h3>
            <p>Fecha: 25/02</p>
            <p>Horario: 20:00</p>
            <p>Precio: $2000</p>
          </div>
          <div className="w-full px-1 flex items-center justify-between">
            <Link to="/viajes" className="">
              Cancelar
            </Link>
            <Button>Confirmar</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trip;
