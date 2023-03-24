import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { AuthContext } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import BackButton from "./BackButton";

const MyTrips = () => {
  const { user } = useContext(AuthContext);
  return (
    <section className="relative w-full shadow-md mx-auto mt-6 p-3 py-16 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center dark:bg-[#262626] dark:border-zinc-700">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      {user && user.myTrips.length > 0 ? (
        <div className="w-11/12 flex flex-col items-center gap-5 md:w-7/12 md:py-12 md:px-4 md:rounded-md md:border md:bg-[#fafafa] md:border-neutral-400 md:dark:bg-neutral-900 md:dark:border-neutral-500">
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
      ) : (
        <div className="">
          <p>No tenes viajes reservados.</p>
        </div>
      )}
    </section>
  );
};

export default MyTrips;
