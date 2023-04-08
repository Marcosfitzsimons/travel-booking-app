import { Upload } from "lucide-react";

export const userInputs = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "john_doe",
  },
  {
    id: "fullName",
    label: "Nombre completo",
    type: "text",
    placeholder: "john_doe",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "addressCda",
    label: "Direccion Carmen",
    type: "text",
    placeholder: "Matheu 88",
  },
  {
    id: "addressCapital",
    label: "Direccion Capital",
    type: "text",
    placeholder: "Dr. Lemon 448",
  },

  {
    id: "file",
    label: "Subir",
    type: "file",
    icon: <Upload className="w-4 h-4" />,
  },
];

export const tripInputs = [
  {
    id: "name",
    label: "Nombre del viaje",
    type: "text",
    placeholder: "De carmen a Capital",
  },
  {
    id: "date",
    label: "Fecha",
    type: "text",
    placeholder: "03/04/23",
  },
  {
    id: "from",
    label: "Desde",
    type: "text",
    placeholder: "Carmen",
  },
  {
    id: "to",
    label: "Hasta",
    type: "text",
    placeholder: "Capital",
  },
  {
    id: "maxCapacity",
    label: "Capacidad maxima",
    type: "number",
    placeholder: "15",
  },
  {
    id: "price",
    label: "Precio",
    type: "number",
    placeholder: "2500",
  },
];

export const PassengerInputs = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "My Hotel",
  },
  {
    id: "type",
    label: "Type",
    type: "text",
    placeholder: "hotel",
  },
  {
    id: "city",
    label: "City",
    type: "text",
    placeholder: "New York",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "elton st, 216",
  },
  {
    id: "distance",
    label: "Distance from City Center",
    type: "text",
    placeholder: "500",
  },
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "The best Hotel",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "description",
  },
  {
    id: "cheapestPrice",
    label: "Price",
    type: "text",
    placeholder: "100",
  },
];

export const roomInputs = [
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "2 bed room",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "King size bed, 1 bathroom",
  },
  {
    id: "price",
    label: "Price",
    type: "number",
    placeholder: "100",
  },
  {
    id: "maxPeople",
    label: "Max People",
    type: "number",
    placeholder: "2",
  },
];
