import BackButton from "@/components/BackButton";
import { Frown } from "lucide-react";

const NotFound = () => {
  return (
    <section className="min-h-screen pt-6 flex flex-col items-center gap-3">
      <div className="flex flex-col items-center">
        <p className="text-xl">Ooops!</p>
        <div className="flex items-center gap-1">
          <h1>La página que estás buscando no existe</h1>
          <Frown className="w-5 h-5" />
        </div>
      </div>
      <BackButton linkTo="/viajes" />
    </section>
  );
};

export default NotFound;
