import axios from "axios";
import BackButton from "../components/BackButton";
import SectionTitle from "../components/SectionTitle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment-timezone";
import NewPassengerDatatable from "../components/NewPassengerDatatable";
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

      <NewPassengerDatatable columns={columns} tripId={tripId} />
    </section>
  );
};

export default NewPassenger;
