import { Mail, MapPin, Phone } from "lucide-react";
import List from "./List";

const Single = () => {
  return (
    <section className="flex flex-col items-center gap-5">
      <div className="relative flex flex-col gap-3 p-5 w-full max-w-lg rounded-md border ">
        <div className="absolute top-5 right-5 py-1 text-white px-2 bg-blue-lagoon-900 rounded-md">
          Editar
        </div>
        <h2>Información</h2>
        <div className="flex gap-3">
          <img src="#" alt="d#" />
          <div className="">
            <h3>Jane Doe</h3>
            <ul className="flex flex-col w-full overflow-hidden bg-white gap-2 max-w-sm border border-blue-lagoon-700/50 items-start p-4 shadow-inner rounded-md dark:bg-black dark:border-blue-lagoon-200">
              <li className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Email:</span>
                .email
              </li>
              <li className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span className="font-medium">Celular:</span> phone
              </li>

              <li className="flex items-center gap-1 shrink-0">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="font-medium shrink-0">Dirrección Carmen:</span>
                <span className="shrink-0">addressCda</span>
              </li>

              <li className="flex items-center gap-1 shrink-0">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="font-medium shrink-0">Dirrecion Capital:</span>
                <span className="shrink-0">addressCapital</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <article className="p-5 border">
        <h3 className="font-bold text-blue-lagoon-800/30 mb-4">
          Ultimos movimientos
        </h3>
        <List />
      </article>
    </section>
  );
};

export default Single;
