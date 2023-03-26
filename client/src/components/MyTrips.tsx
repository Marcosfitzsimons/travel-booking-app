import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { AuthContext } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import BackButton from "./BackButton";

const MyTrips = () => {
  const { user } = useContext(AuthContext);
  return (
    <section className="w-full mx-auto mt-6  bg-transparent flex flex-col gap-5 items-center">
      <div className="relative w-full bg-white rounded-md border border-blue-lagoon-700/50 px-3 py-16 flex flex-col items-center gap-5 md:w-7/12 md:py-12 dark:bg-[#262626] dark:border-neutral-600">
        <div className="absolute top-3 left-3">
          <BackButton />
        </div>
        {user && user.myTrips.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="">
            <p>No tenes viajes reservados.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyTrips;
