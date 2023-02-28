import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";

const INITIAL_VALUES = {
  name: "",
  date: "",
  departureTime: "",
  price: "",
};

const Trip = () => {
  const [data, setData] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);

  const location = useLocation();
  const path = location.pathname;
  const id = path.split("/")[2];
  console.log("En single trip page.");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8800/api/trips/${id}`);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="section">
      <div className="">
        <h2 className="text-3xl font-medium">Confirmar lugar</h2>
        {loading ? (
          "loading"
        ) : (
          <div className="w-10/12 mx-auto mt-6 p-3 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center text-center dark:bg-[#262626] dark:border-zinc-700">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">{data.name}</h3>
              <p>Fecha: {data.date}</p>
              <p>Horario: {data.departureTime}</p>
              <p>Precio: ${data.price}</p>
            </div>
            <div className="w-full px-1 flex items-center justify-between">
              <Link to="/viajes" className="">
                Cancelar
              </Link>
              <Button>Confirmar</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Trip;
