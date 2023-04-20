import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Eye, Trash2 } from "lucide-react";
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
} from "./ui/alert-dialog";
import { toast } from "../hooks/ui/use-toast";
import { Link } from "react-router-dom";

type Passenger = {
  _id: string;
  createdBy: UserData;
};

type UserData = {
  _id: string;
  addressCapital: string;
  addressCda: string;
  email: string;
  fullName: string;
  image?: string;
  myTrips: Trip[];
  phone: undefined | number;
  username: string;
};

interface Column {
  field: string;
  headerName: string;
  width: number;
  renderCell?: (params: any) => JSX.Element;
}

type DataTableProps = {
  columns: Column[];
  tripPassengers: Passenger[];
  tripId: string | undefined;
};

const PassengersDatable = ({
  columns,
  tripPassengers,
  tripId,
}: DataTableProps) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<null | string>(null);
  const [list, setList] = useState(tripPassengers);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (userId: string) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://travel-booking-api-production.up.railway.app/api/passengers/${userId}/${tripId}`,
        { headers }
      );
      toast({
        description: "Lugar cancelado con éxito.",
      });
      setLoading(false);
      setList(list.filter((item) => item.createdBy._id !== userId));
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      setErr(err.message);
      toast({
        variant: "destructive",
        description: `Error al cancelar lugar, intente más tarde. ${
          err ? `"${err}"` : ""
        }`,
      });
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 180,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Eye className="absolute left-2 h-4 w-4" />
              <Link
                to={`/passengers/${params.row.createdBy._id}/${tripId}`}
                className="px-3 pl-7 rounded-md z-20 border border-blue-lagoon-200 bg-transprent hover:border-blue-lagoon-600/50 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:bg-black dark:hover:border-blue-lagoon-300/80 dark:bg-transparent"
              >
                Ver
              </Link>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="relative flex items-center">
                  <Trash2 className="absolute cursor-pointer text-white left-2 h-4 w-4" />
                  <button
                    className={`px-2 pl-7 text-white font-medium rounded-md border border-red-500 bg-red-500 hover:border-blue-lagoon-600/50 dark:border-red-600 dark:bg-red-600 dark:hover:border-blue-lagoon-300/80`}
                  >
                    Borrar
                  </button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no podrá deshacerse. Esto eliminará
                    permanentemente al usuario del viaje.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col-reverse gap-1 md:flex-row md:justify-end">
                  <AlertDialogCancel className="md:w-auto">
                    No, volver a información del viaje.
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(params.row.createdBy._id)}
                    className="md:w-auto"
                  >
                    Si, borrar pasajero
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return (
    <div className={`${list.length > 0 ? "h-[400px]" : ""} w-full`}>
      {list.length > 0 ? (
        <DataGrid
          rows={list}
          columns={actionColumn.concat(columns)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 9,
              },
            },
          }}
          pageSizeOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
          className="w-[min(100%,1000px)] text-blue-lagoon-800 bg-white/40 border border-blue-lagoon-500/20 dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300 dark:bg-[#141414] dark:text-neutral-100"
        />
      ) : (
        <div className="mx-auto flex flex-col items-center gap-3">
          <p>El viaje no tiene pasajeros por el momento.</p>
        </div>
      )}
    </div>
  );
};

export default PassengersDatable;
