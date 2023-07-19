import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
  Eye,
  Trash2,
  Map,
  RotateCcw,
  ListPlus,
  Plus,
  UserPlus,
  PlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";
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
import ActionButton from "./ActionButton";
import { UserPlusIcon } from "lucide-react";
import ActionButtonDatatable from "./ActionButtonDatatable";

type Trip = {
  _id: string;
  name: string;
  date: string;
  from: string;
  departureTime: string;
  available: boolean;
  to: string;
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
  const baseUrl = `https://fabebus-api-example.onrender.com/api/special-trips`;

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
            <ActionButtonDatatable
              linkTo={`/special-trips/${params.row._id}`}
              text="Ver"
              icon={
                <Eye className="absolute left-[13px] top-[5.5px] h-4 w-4" />
              }
            />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="relative flex items-center">
                  <button
                    disabled={isLoading}
                    className="pl-[21px] rounded-md text-[#b4343a] font-semibold transition-colors hover:text-red-300"
                  >
                    <Trash2 className="absolute left-1 top-[.6px] h-4 w-4" />
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

  return (
    <div className="h-[600px] w-full">
      <div className="w-full my-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex items-end gap-1 w-[min(100%,184px)]">
          <DatePickerContainer
            startDate={startDate}
            setStartDate={setStartDate}
          />
          <div className="absolute -right-[46px] h-full">
            <div className="relative flex w-[38px] h-full aspect-square before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-pink-1-800/50 before:ring-2 before:ring-slate-400/10 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-slate-200/20 focus-within:after:shadow-pink-1-700/30 after:transition dark:focus-within:after:shadow-pink-1-300/40 dark:before:ring-slate-800/60 dark:before:border-pink-1-300">
              <Button
                className="absolute w-[38px] h-full flex items-center justify-center cursor-pointer p-2 bg-card rounded-lg border border-slate-800/20 shadow-input dark:bg-[hsl(0,0%,11%)] dark:border-slate-800 dark:shadow-none !outline-none dark:hover:text-white"
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
          <div className="flex items-center gap-1 text-sm lg:text-base">
            <Map className="hidden animate-pulse text-accent sm:flex sm:h-5 sm:w-5" />
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
          <ActionButton
            text="Crear viaje particular"
            icon={
              <Plus className="absolute cursor-pointer left-[13px] top-[7.3px] h-[18px] w-[18px]" />
            }
            linkTo={"/special-trips/new"}
          />
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
          className="w-[min(100%,1400px)] shadow-md border-none dark:border-border-color-dark dark:text-neutral-100"
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
          className="w-[min(100%,1400px)] shadow-md dark:border-border-color-dark dark:text-neutral-100"
        />
      )}
    </div>
  );
};

export default TripsDatatable;
