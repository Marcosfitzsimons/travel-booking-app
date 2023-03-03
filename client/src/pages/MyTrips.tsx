import React from "react";
import { Button } from "../components/ui/button";

const MyTrips = () => {
  return (
    <section className="section">
      <div className="">
        <h2 className="text-3xl font-medium">Mis próximos viajes:</h2>
        <div className="w-10/12 relative mx-auto mt-6 p-3 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center text-center dark:bg-[#262626] dark:border-zinc-700">
          <div className="w-20 rounded-full">
            <img
              src="https://picsum.photos/200"
              alt="trip image"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">name</h3>
            <p>Fecha: date</p>
            <p>Horario: departureTime</p>
            <p>Precio: price</p>
          </div>
          <div className="w-full px-1 flex items-center justify-between">
            <Button variant="destructive">Cancelar</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyTrips;
