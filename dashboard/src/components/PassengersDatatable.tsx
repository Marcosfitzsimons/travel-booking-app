import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Crop, Eye, Fingerprint, Milestone, Trash2 } from "lucide-react";
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
import { User } from "lucide-react";
import { DialogDescription } from "./ui/dialog";
import { Separator } from "./ui/separator";

type Trip = {
  name: string;
  date: Date | null | undefined;
  from: string;
  departureTime: string;
  to: string;
  arrivalTime: string;
  maxCapacity: string;
  price: string;
};

type addressCda = {
  street: string;
  streetNumber: number | undefined;
  crossStreets: string;
};

type UserData = {
  _id: string;
  username: string;
  fullName: string;
  addressCda: addressCda;
  addressCapital: string;
  email: string;
  phone: number | undefined;
  dni: number | undefined;
  image?: string;
  myTrips: Trip[];
};

type Passenger = {
  _id: string;
  createdBy?: UserData;
  addressCda?: addressCda;
  addressCapital?: string;
  fullName?: string;
  dni?: string;
};

type DataTableProps = {
  columns: any;
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

  console.log(list);

  const handleDelete = async (userId: string) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
        { headers }
      );
      toast({
        description: "Lugar cancelado con éxito.",
      });
      setLoading(false);
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 180,
      renderCell: (params: any) => {
        const isPassenger = params.row.createdBy;
        return (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              {isPassenger ? (
                <Link
                  to={`/passengers/${params.row.createdBy._id}/${tripId}`}
                  className="px-[12px] pl-[29px] py-[2px] z-20 rounded-md border border-teal-800 bg-teal-800/60 text-white transition-colors hover:border-black font-semibold dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500"
                >
                  <Eye className="absolute left-3 top-[4px] h-4 w-4" />
                  Ver
                </Link>
              ) : (
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
                          Información pasajero
                        </DialogTitle>
                        <DialogDescription className="flex items-center justify-center gap-1">
                          <span className="font-bold">ID:</span>{" "}
                          <span>{params.row._id ? params.row._id : ""}</span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col w-full overflow-hidden gap-2 max-w-sm items-start px-2 lg:px-0 lg:flex-row lg:pt-0 lg:justify-around lg:max-w-6xl">
                        <div className="w-full flex flex-col gap-1 lg:basis-1/3 lg:my-2">
                          <Separator className="w-8 self-center my-2 bg-border-color lg:hidden dark:bg-border-color-dark" />
                          <h5 className="text-center w-full font-medium dark:text-white lg:mb-2 lg:text-xl">
                            Datos personales
                          </h5>

                          <ul className="flex flex-col w-full overflow-hidden gap-1 lg:shadow-md lg:py-2 lg:px-4 lg:rounded-md lg:bg-white lg:border lg:border-border-color lg:dark:border-border-color-dark lg:dark:bg-black">
                            <li>
                              <User className="h-4 w-4 text-icon-color dark:text-icon-color-dark" />
                              <span className="font-bold">
                                Nombre completo:
                              </span>
                              <span>
                                {params.row.fullName
                                  ? params.row.fullName
                                  : "Pasajero anónimo"}
                              </span>
                            </li>
                            <li className="flex items-center gap-1 shrink-0">
                              <Fingerprint className="w-4 h-4 text-icon-color dark:text-icon-color-dark shrink-0" />
                              <span className="font-medium shrink-0">DNI:</span>
                              <span className="shrink-0">
                                {params.row.dni ? params.row.dni : "-"}
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="w-full flex flex-col gap-1 lg:basis-[60%] lg:my-2">
                          <Separator className="w-8 self-center my-2 bg-border-color lg:hidden dark:bg-border-color-dark" />
                          <h5 className="text-center w-full font-medium dark:text-white lg:mb-2 lg:text-xl">
                            Domicilios
                          </h5>
                          <div className="flex flex-col gap-1 lg:shadow-md lg:flex-row lg:justify-between lg:py-2 lg:px-4 lg:rounded-md lg:bg-white lg:border lg:border-border-color lg:dark:border-border-color-dark lg:dark:bg-black">
                            <div className="flex flex-col gap-1 lg:basis-[55%]">
                              <h6 className="font-serif text-icon-color dark:text-icon-color-dark">
                                Carmen de Areco
                              </h6>
                              <div className="flex items-center gap-1">
                                <Milestone className="w-4 h-4 text-icon-color dark:text-icon-color-dark" />
                                <span className="font-medium dark:text-white">
                                  Dirreción:
                                </span>
                                <span>
                                  {params.row.addressCda
                                    ? `${params.row.addressCda.street} ${params.row.addressCda.streetNumber}`
                                    : "-"}
                                </span>
                              </div>
                              <div className="flex flex-col gap-[2px] sm:flex-row sm:items-center sm:gap-1">
                                <div className="flex items-center gap-1">
                                  <Crop className="w-4 h-4 text-icon-color dark:text-icon-color-dark" />
                                  <span className="font-medium dark:text-white">
                                    Calles que cruzan:
                                  </span>
                                </div>
                                <span className="">
                                  {" "}
                                  {params.row.addressCda
                                    ? params.row.addressCda.crossStreets
                                    : "-"}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 lg:basis-[40%]">
                              <h6 className="font-serif text-icon-color dark:text-icon-color-dark">
                                Capital Federal
                              </h6>
                              <div className="flex items-center gap-1">
                                <Milestone className="w-4 h-4 text-icon-color dark:text-icon-color-dark" />
                                <span className="font-medium dark:text-white">
                                  Dirreción:
                                </span>{" "}
                                <p>
                                  {params.row.addressCapital
                                    ? params.row.addressCapital
                                    : "-"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="relative flex items-center">
                  <button className="pl-[21px] rounded-md text-[#b4343a] font-semibold transition-colors hover:text-red-300">
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
                    permanentemente al usuario de este viaje.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col-reverse gap-1 md:flex-row md:justify-end">
                  <AlertDialogCancel className="md:w-auto">
                    No, volver atrás.
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      handleDelete(
                        isPassenger ? params.row.createdBy._id : params.row._id
                      )
                    }
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
          className="w-[min(100%,1400px)] shadow-input dark:text-neutral-100"
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
