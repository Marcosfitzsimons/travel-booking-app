import { Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "../hooks/ui/use-toast";
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
} from "./ui/alert-dialog";

import axios from "axios";
import { Toast } from "./ui/toast";
import { useState } from "react";

type Publication = {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

interface PublicationCardProps {
  item: Publication;
  setList: (value: any) => void;
  list: Publication[];
}

const PublicationCard = ({ item, setList, list }: PublicationCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<any>(false);
  const { _id, title, subtitle, description, createdAt } = item;

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `https://fabebus-api-example.onrender.com/api/publications/${_id}`,
        {
          headers,
        }
      );
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

  return (
    <article className="w-full flex flex-col gap-2 p-4 rounded-md border border-border-color lg:flex-row lg:justify-between lg:h-[120px] dark:border-border-color-dark dark:hover:border-zinc-400">
      <div className="overflow-y-scroll relative w-full">
        <h3 className="font-bold dark:text-white text-xl shrink-0">{title}</h3>
        {subtitle && <h4>{subtitle}</h4>}
        <p className="text-gray-500 dark:text-slate-500">{description}</p>
        <p className="absolute right-1 top-1 text-sm text-[#737373] font-extralight dark:text-slate-500">
          {createdAt}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="relative flex items-center">
              <button
                disabled={isLoading}
                className="px-[12px] pl-[29px] py-[2px] rounded-md border border-neutral-600 bg-[#b4343a] text-white font-semibold transition-colors hover:border-black dark:bg-[#b4343a] dark:border-blue-lagoon-400/80 dark:hover:border-blue-lagoon-300"
              >
                <Trash2 className="absolute text-white left-3 top-[6px] h-4 w-4" />
                Borrar
              </button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no podrá deshacerse. Esto eliminará permanentemente
                la publicación
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col-reverse gap-1 md:flex-row md:justify-end">
              <AlertDialogCancel className="md:w-auto">
                No, volver al listado de publicaciones
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(_id)}
                className="md:w-auto"
              >
                Si, borrar publicación
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="relative flex items-center">
          <Link
            to={`/publications/${_id}`}
            className="px-[12px] pl-[29px] py-[2px] z-20 flex items-center rounded-md border border-teal-800 bg-teal-800/60 text-white transition-colors hover:border-black font-semibold dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500"
          >
            <Eye className="absolute left-3 h-4 w-4" />
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PublicationCard;
