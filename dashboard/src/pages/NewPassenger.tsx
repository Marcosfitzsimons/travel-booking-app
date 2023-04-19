import axios from "axios";
import BackButton from "../components/BackButton";
import SectionTitle from "../components/SectionTitle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment-timezone";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import UsersDatatable from "../components/UsersDatatable";
interface Column {
  field: string;
  headerName: string;
  width: number;
  renderCell?: (params: any) => JSX.Element;
}

type NewPassengerProps = {
  title: string;
  columns: Column[];
};

const INITIAL_STATES = {
  _id: "",
  name: "",
  date: "",
  from: "",
  available: true,
  departureTime: "",
  to: "",
  arrivalTime: "",
  maxCapacity: undefined,
  price: undefined,
  passengers: [],
};

const NewPassenger = ({ title, columns }: NewPassengerProps) => {
  const [data, setData] = useState(INITIAL_STATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);
  console.log(data);
  let { id: tripId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `https://travel-booking-api-production.up.railway.app/api/trips/${tripId}`,
          {
            headers,
          }
        );
        const momentDate = moment.utc(res.data.date).add(1, "day").toDate();
        const newDate = moment.tz(momentDate, "America/Argentina/Buenos_Aires");
        const formattedDate = moment(newDate).format("DD/MM/YY");
        setData({ ...res.data, date: formattedDate });
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <SectionTitle>{title}</SectionTitle>
      <div className="self-start mb-2">
        <BackButton linkTo={`/trips/${tripId}`} />{" "}
      </div>
      <div className="p-5 rounded-md bg-white/40 border border-blue-lagoon-500/20 shadow-md dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300 dark:bg-black">
        <div className="">
          <h2 className="text-xl lg:text-2xl">Listado de usuarios</h2>
          <p className="text-sm lg:text-base">
            Selecciona un usuario para agregar al viaje.
          </p>
        </div>
        <div className="flex flex-col gap-1 my-4 max-w-md">
          <Label>Buscar por Nombre de Usuario o Email:</Label>
          <Input placeholder="not working yet..." />
        </div>
        <UsersDatatable columns={columns} tripId={tripId} />
      </div>
    </section>
  );
};

export default NewPassenger;
