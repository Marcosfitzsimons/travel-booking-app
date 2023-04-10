import { User } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

export const userColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "user",
    headerName: "Usuario",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
              src={params.row.image || ""}
              alt="avatar"
            />
            <AvatarFallback>
              <User className="w-12 h-12 dark:text-blue-lagoon-100" />
            </AvatarFallback>
          </Avatar>
          {params.row.fullName}
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Nombre de usuario",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Celular",
    width: 100,
  },
  {
    field: "addressCda",
    headerName: "Dirección (Carmen)",
    width: 180,
  },
  {
    field: "addressCapital",
    headerName: "Dirección (Capital)",
    width: 180,
  },
];

export const tripColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Nombre", width: 150 },
  {
    field: "date",
    headerName: "Fecha",
    width: 140,
    renderCell: (params) => {
      return (
        <p>
          {params.row.date ? format(new Date(params.row.date), "dd/MM/yy") : ""}
        </p>
      );
    },
  },
  { field: "from", headerName: "Lugar de salida", width: 140 },
  { field: "departureTime", headerName: "Hora de salida", width: 70 },
  { field: "to", headerName: "Lugar de llegada", width: 140 },
  { field: "arrivalTime", headerName: "Hora de llegada", width: 70 },
  { field: "price", headerName: "Precio", width: 70 },
  { field: "maxCapacity", headerName: "Capacidad máxima", width: 70 },
];
// to do
export const passengerColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "user",
    headerName: "Usuario",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
              src={params.row.createdBy.image || ""}
              alt="avatar"
            />
            <AvatarFallback>
              <User className="w-12 h-12 dark:text-blue-lagoon-100" />
            </AvatarFallback>
          </Avatar>
          {params.row.createdBy.fullName}
        </div>
      );
    },
  },
  {
    field: "addressCda",
    headerName: "Dirección (Carmen)",
    width: 180,
    renderCell: (params) => {
      return <>{params.row.createdBy.addressCda}</>;
    },
  },
  {
    field: "addressCapital",
    headerName: "Dirección (Capital)",
    width: 180,
    renderCell: (params) => {
      return <>{params.row.createdBy.addressCapital}</>;
    },
  },
  {
    field: "username",
    headerName: "Nombre de usuario",
    width: 200,
    renderCell: (params) => {
      return <>{params.row.createdBy.username}</>;
    },
  },
  {
    field: "phone",
    headerName: "Celular",
    width: 100,
    renderCell: (params) => {
      return <>{params.row.createdBy.phone}</>;
    },
  },
];
