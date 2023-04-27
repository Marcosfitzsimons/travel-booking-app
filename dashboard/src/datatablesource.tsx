import { User } from "lucide-react";
import moment from "moment-timezone";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

const formatDate = (date: string) => {
  // worksss
  const momentDate = moment.utc(date);
  const timezone = "America/Argentina/Buenos_Aires"; // or any other time zone in GMT-0300
  const timezone_date = momentDate.tz(timezone);
  const formattedDate = timezone_date.format("DD/MM/YYYY");
  return formattedDate;
};

export const userColumns = [
  {
    field: "user",
    headerName: "Nombre completo",
    width: 230,
    renderCell: (params: any) => {
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
    headerName: "Usuario",
    width: 160,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Celular",
    width: 130,
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
  {
    field: "date",
    headerName: "Fecha",
    width: 100,
    renderCell: (params: any) => {
      return <p>{params.row.date ? formatDate(params.row.date) : ""}</p>;
    },
  },
  { field: "name", headerName: "Nombre", width: 180 },
  { field: "from", headerName: "Salida", width: 120 },
  { field: "departureTime", headerName: "Hora", width: 70 },
  { field: "to", headerName: "Llegada", width: 120 },
  { field: "arrivalTime", headerName: "Hora", width: 70 },
  { field: "price", headerName: "Precio", width: 70 },
  { field: "maxCapacity", headerName: "Capacidad máxima", width: 80 },
];

export const passengerColumns = [
  {
    field: "user",
    headerName: "Nombre completo",
    width: 230,
    renderCell: (params: any) => {
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
    field: "username",
    headerName: "Usuario",
    width: 150,
    renderCell: (params: any) => {
      return <p className="">@{params.row.createdBy.username}</p>;
    },
  },

  {
    field: "addressCda",
    headerName: "Dirección (Carmen)",
    width: 180,
    renderCell: (params: any) => {
      return <p className="">{params.row.createdBy.addressCda}</p>;
    },
  },
  {
    field: "addressCapital",
    headerName: "Dirección (Capital)",
    width: 180,
    renderCell: (params: any) => {
      return <p className="">{params.row.createdBy.addressCapital}</p>;
    },
  },
  {
    field: "phone",
    headerName: "Celular",
    width: 130,
    renderCell: (params: any) => {
      return <p className="">{params.row.createdBy.phone}</p>;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
    renderCell: (params: any) => {
      return <p className="">{params.row.createdBy.email}</p>;
    },
  },
];
