import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Trash2 } from "lucide-react";
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

type TripProps = {
  id: string;
  name: string;
  date: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  maxCapacity: number;
  price: number;
  available: boolean;
};

type addressCda = {
  street: string;
  streetNumber: number | undefined;
  crossStreets: string;
};

type UserData = {
  fullName: string;
  username: string;
  addressCda: addressCda;
  addressCapital: string;
  dni: number | undefined;
  phone: undefined | number;
  email: string;
  image?: string;
};

interface Column {
  field: string;
  headerName: string;
  width: number;
  renderCell?: any;
}

type DataTableProps = {
  columns: any;
  userTrips: TripProps[];
  userData: UserData;
};

const MyTripsDatatable = ({ columns, userTrips, userData }: DataTableProps) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<null | string>(null);
  const [list, setList] = useState(userTrips);
  const userId = userData._id;

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (tripId: string) => {
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
      setList(list.filter((item) => item.id !== tripId));
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
      width: 110,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center gap-2">
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
                    permanentemente al usuario del viaje.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col-reverse gap-1 md:flex-row md:justify-end">
                  <AlertDialogCancel className="md:w-auto">
                    No, volver al perfil del usuario.
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(params.row.id)}
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
    <div className="h-[400px] w-full">
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
        getRowId={(row) => row.id}
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
        className="w-[min(100%,1200px)] shadow-md border-border-color dark:border-border-color-dark dark:text-neutral-100"
      />
    </div>
  );
};

export default MyTripsDatatable;
