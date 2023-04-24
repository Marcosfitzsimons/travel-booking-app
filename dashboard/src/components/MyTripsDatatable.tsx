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

type UserData = {
  _id: string;
  addressCapital: string;
  addressCda: string;
  email: string;
  fullName: string;
  image?: string;
  myTrips: TripProps[];
  phone: undefined | number;
  username: string;
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
      width: 180,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="relative flex items-center">
                  <button className="px-2 pl-[25px] rounded-md border border-[#A72F35] bg-[#A72F35] text-white dark:bg-[#A72F35] dark:hover:border-blue-lagoon-300/80">
                    <Trash2 className="absolute text-white left-2 top-[2px] h-4 w-4" />
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
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 9,
            },
          },
        }}
        pageSizeOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
        sx={{
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
        className="w-[min(100%,1000px)] shadow-md border-border-color dark:border-border-color-dark dark:text-neutral-100"
      />
    </div>
  );
};

export default MyTripsDatatable;
