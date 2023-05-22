import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Eye, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { toast } from "../hooks/ui/use-toast";
import PublicationCard from "../components/PublicationCard";
import SectionTitle from "../components/SectionTitle";

type Publication = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
};

const PublicationsDatatable = () => {
  const [list, setList] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<any>(false);

  const baseUrl = `https://fabebus-api-example.onrender.com/api/publications`;

  const { data, loading, error } = useFetch(baseUrl);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`${baseUrl}/${id}`, {
        headers,
      });
      setList(list.filter((item) => item._id !== id));
      setIsLoading(false);
      toast({
        description: "Usuario eliminado con éxito.",
      });
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setIsLoading(false);
      setIsError(errorMsg);
      toast({
        variant: "destructive",
        description: "Error al eliminar usuario, intentar más tarde.",
      });
    }
  };

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle>Publicaciones</SectionTitle>
      <div className="">
        <div className="w-full my-3 flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-1">
            {error && <p className="text-red-500 order-2">{error.message}</p>}
            {isError && <p className="text-red-500 order-2">{isError}</p>}
            {isLoading && <p className="text-red-500 order-2">is loading...</p>}
          </div>
          <div className="w-full flex items-end justify-between sm:w-auto sm:gap-3">
            <div className="relative flex items-center self-end">
              <Link
                to="/users/new"
                className="px-3.5 py-1 pl-[32px] z-20 rounded-md border border-teal-800 bg-teal-800/60 text-white font-semibold transition-colors hover:border-black dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500"
              >
                <Plus className="absolute cursor-pointer left-3 top-[7px] h-5 w-5" />
                Agregar publicación
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <PublicationCard />
          <PublicationCard />
          <PublicationCard />
        </div>
      </div>
    </div>
  );
};

export default PublicationsDatatable;
