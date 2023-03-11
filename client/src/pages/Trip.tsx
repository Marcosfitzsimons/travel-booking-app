import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
} from "../components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import { AuthContext } from "../context/AuthContext";
import SectionTitle from "../components/ui/SectionTitle";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const INITIAL_VALUES = {
  name: "",
  date: "",
  departureTime: "",
  price: "",
  image: "",
};
const INITIAL_SEAT_VALUES = {
  seatNumber: "",
  available: false,
};

const Trip = () => {
  const [data, setData] = useState(INITIAL_VALUES);
  const [seat, setSeat] = useState(INITIAL_SEAT_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);
  const [selectValue, setSelectValue] = useState("1");
  const location = useLocation();
  const path = location.pathname;
  const id = path.split("/")[2];

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8800/api/trips/seat/${id}`
        );
        setSeat(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleConfirm = () => {
    if (user) {
      // navigate("/mis-viajes");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="section">
      <div className="flex flex-col gap-10">
        <SectionTitle>Confirmar lugar</SectionTitle>
        {loading ? (
          "loading"
        ) : (
          <div className="relative bg-white/80 rounded-md shadow-md border max-w-xl border-slate-200 border-l-4 border-l-slate-200 mb-10 pb-2 dark:bg-neutral-900 dark:border-slate-700 dark:border-l-slate-800">
            <div className="px-4 pt-9 pb-4 lg:px-5 lg:py-6">
              {data.image && (
                <div className="absolute w-14 top-[-1.8rem] left-4 rounded-full lg:w-24 lg:relative lg:top-0 lg:left-0 ">
                  <Avatar className="w-14 h-14 rounded-full lg:rounded-md lg:w-24 lg:h-24">
                    <AvatarImage
                      src={
                        data.image ? data.image : "https://i.pravatar.cc/150"
                      }
                      className="lg:rounded-md"
                    />
                    <AvatarFallback className="lg:rounded-md">?</AvatarFallback>
                  </Avatar>
                </div>
              )}

              <div className="w-full px-1 flex items-center justify-between">
                <Link to="/viajes" className="">
                  Cancelar
                </Link>
                <Button onClick={handleConfirm}>Confirmar</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Trip;
