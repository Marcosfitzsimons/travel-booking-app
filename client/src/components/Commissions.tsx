import { Truck } from "lucide-react";
import GorgeousBoxBorder from "./GorgeousBoxBorder";
import Whatsapp from "./Whatsapp";

const Commissions = () => {
  return (
    <GorgeousBoxBorder className="w-full max-w-lg mx-auto lg:mx-0 ">
      <article className="flex items-center gap-3 rounded-lg py-3 px-4 border border-l-4 border-l-blue-700 bg-card shadow-input lg:py-6 dark:shadow-none">
        <Truck className="w-5 h-5 shrink-0 text-accent lg:w-6 lg:h-6" />
        <div className="flex flex-col">
          <h4 className="text-base font-medium lg:text-lg">Comisiones</h4>
          <div className="flex-wrap flex items-center gap-1">
            <p className="text-sm lg:text-base">
              Para comisiones comunicarse al
            </p>
            <Whatsapp />
          </div>
        </div>
      </article>
    </GorgeousBoxBorder>
  );
};

export default Commissions;
