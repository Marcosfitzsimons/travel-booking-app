import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
  Eye,
  PlusCircle,
  Trash2,
  Map,
  RotateCcw,
  ListPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");
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
import { Button } from "./ui/button";

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
    let dateSelected: string;
    if (startDate) {
      dateSelected = moment(startDate).locale("es").format("ddd DD/MM");
      filteredTrips = data.filter((trip: Trip) => {
        moment.locale("es", {
          weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        });
        const momentDate = moment.utc(trip.date);
        const timezone = "America/Argentina/Buenos_Aires";
        const timezone_date = momentDate.tz(timezone);
        const formatted_date = timezone_date.format("ddd DD/MM");

        return formatted_date === dateSelected;
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
              <Link
                to={`/trips/${params.row._id}`}
                className="px-[12px] pl-[29px] py-[2px] z-20 rounded-md border border-teal-800 bg-teal-800/60 text-white transition-colors hover:border-black font-semibold dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500"
              >
                <Eye className="absolute left-3 top-[4px] h-4 w-4" />
                Ver
              </Link>
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

  let filteredTrips;
  let dateSelected: string;
  if (startDate) {
    dateSelected = moment(startDate).locale("es").format("ddd DD/MM");
    filteredTrips = data.filter((trip: Trip) => {
      moment.locale("es", {
        weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      });
      const momentDate = moment.utc(trip.date);
      const timezone = "America/Argentina/Buenos_Aires";
      const timezone_date = momentDate.tz(timezone);
      const formatted_date = timezone_date.format("ddd DD/MM");

      return formatted_date === dateSelected;
    });
  }

  useEffect(() => {
    setList(data);
  }, [data]);

  useEffect(() => {
    handleFilteredTrips();
  }, [startDate]);

  return (
    <div className="h-[600px] w-full">
      <div className="w-full my-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex items-end gap-1 w-[min(100%,184px)]">
          <div className="shadow-input shadow-blue-lagoon-800/10 rounded-lg">
            <DatePickerContainer
              startDate={startDate}
              setStartDate={setStartDate}
            />
          </div>
          <div className="absolute -right-[46px] h-full shadow shadow-blue-lagoon-800/10 rounded-lg">
            <div className="relative flex w-[38px] h-full aspect-square before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-blue-lagoon-400 before:ring-2 before:ring-blue-lagoon-200/50 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 focus-within:after:shadow-blue-lagoon-400 after:transition dark:focus-within:after:shadow-blue-lagoon-300/40 dark:before:ring-blue-lagoon-500/20 dark:before:border-blue-lagoon-300">
              <Button
                className="absolute w-[38px] h-full flex items-center justify-center cursor-pointer p-2 bg-white/80 shadow-input shadow-blue-lagoon-500/10 rounded-lg border border-border-color focus:border-blue-lagoon-200/50  dark:border-color-black dark:bg-black/40 dark:hover:text-white dark:focus:border-blue-lagoon-500/20"
                onClick={() => setStartDate(null)}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
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
          <div className="relative flex items-center md:self-end">
            <Link
              to="/trips/new"
              className="px-3.5 py-1 pl-[32px] z-20 rounded-md border border-teal-800 bg-teal-800/60 text-white font-semibold transition-colors hover:border-black dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500"
            >
              <ListPlus className="absolute left-3 top-[7px] h-5 w-5" />

              {linkText}
            </Link>
          </div>
        </div>
      </div>
      {filteredList.length > 0 ? (
        <DataGrid
          rows={filteredList}
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
          pageSizeOptions={[9]}
          getRowId={(row) => row._id}
          className="w-[min(100%,1200px)] shadow-md border-none dark:border-border-color-dark dark:text-neutral-100"
        />
      ) : (
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
          className="w-[min(100%,1200px)] shadow-md dark:border-border-color-dark dark:text-neutral-100"
        />
      )}
    </div>
  );
};

export default TripsDatatable;
