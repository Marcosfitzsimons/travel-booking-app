import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Eye, PlusCircle, Trash2, Map, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { format, parse, parseISO } from "date-fns";
import "moment-timezone";
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
} from "./ui/alert-dialog";
import { toast } from "../hooks/ui/use-toast";
import DatePickerContainer from "./DatePickerContainer";

type Trip = {
  _id: string;
  name: string;
  date: string;
  from: string;
  departureTime: string;
  to: string;
  arrivalTime: string;
  maxCapacity: string;
  price: string;
};
interface Column {
  field: string;
  headerName: string;
  width: number;
  renderCell?: (params: any) => JSX.Element;
}

type DataTableProps = {
  columns: Column[];
  linkText: string;
};

type ExtendedColumn = Column & {
  renderCell?: (params: any) => JSX.Element;
};

const TripsDatatable = ({ columns, linkText }: DataTableProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<null | string>(null);
  const [list, setList] = useState<Trip[]>([]);
  const [filteredList, setFilteredList] = useState<Trip[]>([]);
  const baseUrl = `https://travel-booking-api-production.up.railway.app/api/trips`;

  const { data, loading, error } = useFetch(baseUrl);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`${baseUrl}/${id}`, { headers });
      toast({
        description: "Viaje eliminado con éxito.",
      });
      setIsLoading(false);
      setList(list.filter((item) => item._id !== id));
    } catch (err: any) {
      setIsLoading(false);
      setErr(err.message);
      toast({
        variant: "destructive",
        description: `${err}. Intentar más tarde.`,
      });
    }
  };

  const handleFilteredTrips = () => {
    let filteredTrips: Trip[];
    if (startDate) {
      const newDate = new Date(startDate);
      const formattedDate = newDate.toISOString();
      const parseDate = parseISO(formattedDate);
      const date = format(parseDate, "dd/MM/yyyy");

      filteredTrips = list.filter((trip: Trip) => {
        const tripDate = format(new Date(trip.date), "dd/MM/yyyy");

        return tripDate == date;
      });
      setFilteredList([...filteredTrips]);
    } else {
      setFilteredList([]);
    }
  };

  const actionColumn: ExtendedColumn[] = [
    {
      field: "action",
      headerName: "Acción",
      width: 180,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Eye className="absolute left-2 top-[2px] h-4 w-4" />
              <Link
                to={`/trips/${params.row._id}`}
                className="px-[9px] pl-[25px] z-20 rounded-md border border-blue-lagoon-200 hover:border-blue-lagoon-600/50 hover:bg-white/30 hover:text-blue-lagoon-400 dark:border-blue-lagoon-300/60 dark:bg-black dark:hover:border-blue-lagoon-300/80 dark:bg-blue-lagoon-300/10 dark:hover:text-inherit"
              >
                Ver
              </Link>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="relative flex items-center">
                  <button className="px-2 pl-[25px] rounded-md border border-[#c03c42] bg-[#A72F35] text-white dark:bg-[#A72F35] dark:hover:border-blue-lagoon-300/80">
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
                    permanentemente este viaje.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col-reverse gap-1 md:flex-row md:justify-end">
                  <AlertDialogCancel className="md:w-auto">
                    No, volver al listado de viajes
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(params.row._id)}
                    className="md:w-auto"
                  >
                    Si, borrar viaje
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setList(data);
  }, [data]);

  useEffect(() => {
    handleFilteredTrips();
  }, [startDate]);
  const customLocaleText = {
    footerPaginationSelectedRows: ({ from, to, count }) =>
      `${from}-${to} of ${count} selected`,
  };
  return (
    <div className="h-[600px] w-full">
      <div className="w-full my-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex items-end gap-1 w-[min(100%,184px)]">
          <div className="shadow-input shadow-blue-lagoon-500/10 rounded-lg">
            <DatePickerContainer
              startDate={startDate}
              setStartDate={setStartDate}
            />
          </div>
          <div className="absolute -right-11 flex h-full aspect-square before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-blue-lagoon-500 before:ring-2 before:ring-blue-lagoon-400/10 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 focus-within:after:shadow-blue-lagoon-300/40 after:transition dark:focus-within:after:shadow-blue-lagoon-300/40 dark:before:ring-blue-lagoon-500/20 dark:before:border-blue-lagoon-300">
            <div
              className="w-full absolute h-full flex items-center justify-center cursor-pointer p-2 bg-white shadow-input shadow-blue-lagoon-500/10 rounded-lg border border-border-color dark:border-color-black dark:bg-black/40 dark:hover:text-white"
              onClick={() => setStartDate(null)}
            >
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          {err && <p>{err}</p>}
          {error && <p>{error}</p>}
        </div>
        <div className="flex justify-between items-end gap-1 lg:gap-3">
          <div className="flex items-center gap-2 text-sm lg:text-base">
            <Map className="hidden animate-pulse sm:flex sm:h-5 sm:w-5" />
            <p className="font-medium">Viajes disponibles:</p>
            <p className="font-light flex items-center gap-1">
              <span
                className={`animate-pulse w-3 h-3 rounded-full ${
                  list.length > 0 ? "bg-green-500" : "bg-red-600"
                }`}
              />
              {loading ? "" : list.length}
            </p>
          </div>
          <div className="relative flex items-center md:self-end bg-white rounded-md dark:bg-transparent">
            <PlusCircle className="absolute left-3 h-4 w-4" />
            <Link
              to="/trips/new"
              className="px-3 py-1 pl-8 rounded-md bg-transparent z-20 border border-blue-lagoon-200 shadow-md hover:border-blue-lagoon-600/50 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:bg-[#141414] dark:hover:border-blue-lagoon-300/80 dark:bg-blue-lagoon-300/10"
            >
              {linkText}
            </Link>
          </div>
        </div>
      </div>
      {filteredList.length > 0 ? (
        <DataGrid
          rows={filteredList}
          columns={actionColumn.concat(columns)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 9,
              },
            },
          }}
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
          pageSizeOptions={[9]}
          getRowId={(row) => row._id}
          className="w-[min(100%,1200px)] shadow-md border-border-color dark:border-border-color-dark dark:text-neutral-100"
        />
      ) : (
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
          getRowId={(row) => row._id}
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
          className="w-[min(100%,1200px)] shadow-md border-border-color dark:border-border-color-dark dark:text-neutral-100"
        />
      )}
    </div>
  );
};

export default TripsDatatable;
