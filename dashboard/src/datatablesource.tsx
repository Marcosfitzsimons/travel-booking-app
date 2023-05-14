import { User } from "lucide-react";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

const formatDate = (date: string) => {
  const momentDate = moment.utc(date);
  const timezone = "America/Argentina/Buenos_Aires";
  const timezone_date = momentDate.tz(timezone);
  const formatted_date = timezone_date.format("ddd DD/MM");
  // with more info: const formatted_date = timezone_date.format("ddd  DD/MM/YYYY HH:mm:ss [GMT]Z (z)");
  return formatted_date;
};

const todayDate = moment().locale("es").format("ddd DD/MM");

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
    field: "addressCda",
    headerName: "Dirección (Carmen)",
    width: 180,
  },
  {
    field: "addressCapital",
    headerName: "Dirección (Capital)",
    width: 180,
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
    field: "dni",
    headerName: "DNI",
    width: 130,
  },
];

export const tripColumns = [
  {
    field: "date",
    headerName: "Fecha",
    width: 130,
    renderCell: (params: any) => {
      return (
        <div className="flex items-center gap-1">
          {params.row.date ? (
            <>
              {todayDate == formatDate(params.row.date) ? (
                <span className="text-green-900 bg-green-300/30 border order-2 border-green-800/80 select-none font-medium rounded-md dark:bg-[#75f5a8]/30 dark:border-[#4ca770] dark:text-white px-1">
                  HOY
                </span>
              ) : (
                ""
              )}
              <p>{formatDate(params.row.date)}</p>
            </>
          ) : (
            ""
          )}
        </div>
      );
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
    field: "username",
    headerName: "Usuario",
    width: 150,
    renderCell: (params: any) => {
      return <p className="">@{params.row.createdBy.username}</p>;
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
  {
    field: "phone",
    headerName: "Celular",
    width: 130,
    renderCell: (params: any) => {
      return <p className="">{params.row.createdBy.phone}</p>;
    },
  },
  {
    field: "dni",
    headerName: "DNI",
    width: 130,
    renderCell: (params: any) => {
      return <p className="">{params.row.createdBy.dni}</p>;
    },
  },
];
