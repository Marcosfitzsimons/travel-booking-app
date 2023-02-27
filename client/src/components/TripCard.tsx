import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const TripCard = () => {
  return (
    <article className="relative bg-white/80 rounded-md shadow-md shadow-red/20 border-l-4 border-l-red mb-10 pb-2 dark:bg-[#262626] max-w-lg">
      <div className="px-4 pt-9 pb-4 flex flex-col gap-4 lg:px-10 lg:pt-6 lg:pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:border-none lg:pb-0 lg:gap-4">
          <div className="inline-block overflow-hidden logo-container absolute w-12 top-[-1.5rem] left-4 lg:relative lg:w-20 lg:top-0 lg:left-0 rounded-full">
            <img
              src="https://github.com/shadcn.png"
              alt="trip image"
              className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle rounded-full"
            />
          </div>
          <div className="flex flex-col lg:gap-1">
            <h3 className="font-bold text-red lg:text-lg ">
              De Carmen a Capital
            </h3>
            <p className="font-medium lg:text-base lg:text-md">Fecha: 25/02</p>
            <p className="font-medium lg:text-base lg:text-md">
              Horario: 20:00
            </p>
            <p className="font-medium lg:text-base lg:text-md ">
              Precio: $2000
            </p>
          </div>
          <div className="self-end">
            <Button>
              <Link to="/viaje/:id">Reservar</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TripCard;
