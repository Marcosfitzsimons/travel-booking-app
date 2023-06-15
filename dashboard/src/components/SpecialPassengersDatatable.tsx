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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Passenger = {
  _id: string;
  fullName?: string;
  dni?: number;
};

type DataTableProps = {
  columns: any;
  tripPassengers: Passenger[];
  tripId: string | undefined;
};

const SpecialPassengersDatable = ({
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

  const handleDelete = async (passengerId: string) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://fabebus-api-example.onrender.com/api/special-passengers/${passengerId}/${tripId}`,
        { headers }
      );
      toast({
        description: "Lugar cancelado con éxito.",
      });
      setLoading(false);
      setList(list.filter((item) => item._id !== passengerId));
      setTimeout(() => {
        location.reload();
      }, 1000);
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

  const handleIsPassengerInfo = (passengerId: string) => {};

  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 180,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Dialog>
                <div className="lg:flex lg:items-center lg:justify-end">
                  <DialogTrigger className="px-[12px] pl-[29px] py-[2px] z-20 rounded-md border border-teal-800 bg-teal-800/60 text-white transition-colors hover:border-black font-semibold dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500">
                    <Eye className="absolute left-3 top-[4px] h-4 w-4" />
                    Ver
                  </DialogTrigger>
                </div>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl lg:text-3xl">
                      Información del pasajero:
                    </DialogTitle>
                  </DialogHeader>
                  <div className="w-10/12 mx-auto">
                    <p className="flex items-center gap-1">
                      ID: <span>{params.row._id ? params.row._id : ""}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      Nombre completo:
                      <span>
                        {params.row.fullName
                          ? params.row.fullName
                          : "Pasajero anónimo"}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      DNI: <span>{params.row.dni ? params.row.dni : "-"}</span>
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="relative flex items-center">
                  <button className="px-[12px] pl-[29px] py-[2px] rounded-md border border-neutral-600 bg-[#b4343a] text-white font-semibold transition-colors hover:border-black dark:bg-[#b4343a] dark:border-blue-lagoon-400/80 dark:hover:border-blue-lagoon-300">
                    <Trash2 className="absolute text-white left-3 top-[4px] h-4 w-4" />
                    Borrar
                  </button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no podrá deshacerse. Esto eliminará
                    permanentemente al pasajero de este viaje.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col-reverse gap-1 md:flex-row md:justify-end">
                  <AlertDialogCancel className="md:w-auto">
                    No, volver atrás
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(params.row._id)}
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
    <div className={`${list.length > 0 ? "h-[600px]" : ""} w-full`}>
      {list.length > 0 ? (
        <DataGrid
          rows={list}
          columns={actionColumn.concat(columns)}
          checkboxSelection
          hideFooterSelectedRowCount
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 9,
              },
            },
          }}
          pageSizeOptions={[9]}
          getRowId={(row) => row._id}
          sx={{
            borderColor: "#007F9633",
            borderRadius: "7px",
            "&>.MuiDataGrid-main": {
              "&>.MuiDataGrid-columnHeaders": {
                borderBottom: "none",
              },

              "& div div div div >.MuiDataGrid-cell": {
                borderBottom: "none",
              },
            },
            "&>.MuiDataGrid-footerContainer": {
              borderTop: "none",
            },
          }}
          className="w-[min(100%,1400px)] shadow-md border-border-color dark:border-border-color-dark dark:text-neutral-100"
        />
      ) : (
        <div className="mx-auto flex flex-col items-center gap-3">
          <p>El viaje no tiene pasajeros por el momento.</p>
        </div>
      )}
    </div>
  );
};

export default SpecialPassengersDatable;
