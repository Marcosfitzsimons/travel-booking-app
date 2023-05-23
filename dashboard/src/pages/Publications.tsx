import { Link } from "react-router-dom";
import { History, Newspaper, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import PublicationCard from "../components/PublicationCard";
import SectionTitle from "../components/SectionTitle";
import Loading from "../components/Loading";

type Publication = {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

const PublicationsDatatable = () => {
  const [list, setList] = useState<Publication[]>([]);

  const baseUrl = `https://fabebus-api-example.onrender.com/api/publications`;

  const { data, loading, error } = useFetch(baseUrl);

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle>Publicaciones</SectionTitle>
      <div className="">
        <div className="w-full my-3 flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between">
          {error && <p className="text-red-500 order-2">{error.message}</p>}
          <div className="w-full flex items-center gap-1 text-sm md:gap-2 md:text-base md:w-auto">
            <Newspaper className="animate-pulse w-4 h-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300 sm:h-5 sm:w-5" />
            <p className="font-medium">Total de publicaciones:</p>
            <p className="font-light flex items-center gap-1">
              <span
                className={`animate-pulse w-3 h-3 rounded-full ${
                  list.length > 0 ? "bg-green-500" : "bg-red-600"
                }`}
              />
              {loading ? "" : list.length}
            </p>
          </div>
          <div className="w-full md:w-auto md:shrink-0">
            <div className="relative flex items-center self-end">
              <Link
                to="/publications/new"
                className="px-3.5 py-1 pl-[32px] z-20 rounded-md border border-teal-800 bg-teal-800/60 text-white font-semibold transition-colors hover:border-black dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500"
              >
                <Plus className="absolute cursor-pointer left-3 top-[7px] h-5 w-5" />
                Agregar publicación
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {loading ? (
            <Loading />
          ) : (
            list.map((publication) => (
              <PublicationCard
                key={publication._id}
                setList={setList}
                list={list}
                item={publication}
              />
            ))
          )}
        </div>
      </div>
      <div className="">
        <h5 className="text-2xl flex items-center gap-2 ">
          <History className="w-4 h-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300 sm:h-5 sm:w-5" />
          Historial de publicaciones
        </h5>
      </div>
    </div>
  );
};

export default PublicationsDatatable;
