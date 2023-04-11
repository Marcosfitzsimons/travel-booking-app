import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";

const INITIAL_STATES = {
  _id: "",
  addressCapital: "",
  addressCda: "",
  email: "",
  fullName: "",
  myTrips: [],
  phone: undefined,
  username: "",
  image: "",
};

const SingleUser = () => {
  const [data, setData] = useState(INITIAL_STATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(`http://localhost:8800/api/users/${id}`, {
          headers,
        });
        setData(res.data.user);
        console.log(res.data.user);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center gap-5">
      <h1>Información del usuario:</h1>
      <div className="relative flex flex-col gap-3 p-5 w-full max-w-lg rounded-md border ">
        <div className="flex flex-col items-center gap-3">
          <div className="w-full relative flex flex-col items-center lg:basis-1/3">
            <Avatar className="w-32 h-32">
              <AvatarImage
                className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                src={data?.image}
                alt="avatar"
              />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-medium text-xl dark:text-white ">
              {data?.fullName}
            </h3>
            <h4 className="text-[#737373]">{data?.username}</h4>
          </div>
          <ul className="flex flex-col w-full overflow-hidden bg-white gap-2 max-w-sm border border-blue-lagoon-700/50 items-start p-4 shadow-inner rounded-md dark:bg-black dark:border-blue-lagoon-200">
            <li className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span className="font-medium">Email:</span>
              {data?.email}
            </li>
            <li className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span className="font-medium">Celular:</span> {data?.phone}
            </li>

            <li className="flex items-center gap-1 shrink-0">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="font-medium shrink-0">Dirrección Carmen:</span>
              <span className="shrink-0">{data?.addressCda}</span>
            </li>

            <li className="flex items-center gap-1 shrink-0">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="font-medium shrink-0">Dirrecion Capital:</span>
              <span className="shrink-0">{data?.addressCapital}</span>
            </li>
          </ul>
          <Button className="w-[min(24rem,100%)]">Editar</Button>
        </div>
      </div>
      <article className="p-5 border">
        <h3 className="font-bold text-blue-lagoon-800/30 mb-4">
          Próximos viajes del usuario:
        </h3>
        <p>List with latest transactions, or next trips.</p>
      </article>
    </section>
  );
};

export default SingleUser;
