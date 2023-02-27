import TripCard from "../components/TripCard";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const Trip = () => {
  return (
    <section className="">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-medium">Nuestros próximos viajes:</h2>
        <div className="flex items-center gap-2">
          <p>Buscar por fecha:</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="27/02/2023" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">26/02/2023</SelectItem>
              <SelectItem value="dark">27/02/2023</SelectItem>
              <SelectItem value="system">28/02/2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
        </div>
      </div>
    </section>
  );
};

export default Trip;
