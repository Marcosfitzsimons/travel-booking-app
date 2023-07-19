import { Link } from "react-router-dom";
import { History, Newspaper, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import PublicationCard from "../components/PublicationCard";
import SectionTitle from "../components/SectionTitle";
import Loading from "../components/Loading";
import ActionButton from "@/components/ActionButton";

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
      <SectionTitle>
        <Newspaper className="w-6 h-6 text-accent sm:h-7 sm:w-7" />
        Publicaciones importantes
      </SectionTitle>
      <div className="">
        <div className="w-full my-3 flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between">
          {error && <p className="text-red-500 order-2">{error.message}</p>}
          <div className="w-full flex items-center gap-1 text-sm md:gap-2 md:text-base md:w-auto">
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
            <ActionButton
              text="Agregar publicación"
              linkTo="/publications/new"
              icon={
                <Plus className="absolute cursor-pointer left-[13px] top-[7.3px] h-[18px] w-[18px]" />
              }
            />
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
          <History className="w-4 h-4 text-icon-color dark:text-icon-color-dark sm:h-5 sm:w-5" />
          Historial de publicaciones
        </h5>
      </div>
    </div>
  );
};

export default PublicationsDatatable;
