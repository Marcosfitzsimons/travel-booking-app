import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

const INITIAL_VALUES = {
  name: "",
  date: "",
  departureTime: "",
  price: "",
  image: "",
};

const Trip = () => {
  const [data, setData] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | boolean>(false);
  const [selectValue, setSelectValue] = useState("1");
  console.log(selectValue);
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
          <div className="w-10/12 relative mx-auto mt-6 p-3 rounded-md border border-slate-300 bg-white/80 flex flex-col gap-5 items-center text-center dark:bg-[#262626] dark:border-zinc-700">
            {data.image && (
              <div className="w-20 rounded-full">
                <img
                  src={data.image}
                  alt="trip image"
                  className="w-20 h-20 rounded-full"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">{data.name}</h3>
              <p>Fecha: {data.date}</p>
              <p>Horario: {data.departureTime}</p>
              <p>Precio: ${data.price}</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="bg-slate-200 dark:bg-zinc-900"
                  >
                    Reservar para más de una persona
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Agregar personas al viaje:
                    </AlertDialogTitle>
                    <AlertDialogDescription
                      asChild
                      className="flex flex-col items-start gap-1"
                    >
                      <div className="">
                        <div className="">
                          <Label>Número de personas:</Label>
                          <Select
                            onValueChange={(selectedValue) =>
                              setSelectValue(selectedValue)
                            }
                            value={selectValue}
                          >
                            <SelectTrigger className="w-[40px]">
                              <SelectValue placeholder="1" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {selectValue === "1" && (
                          <div className="">
                            <Label>Nombre completo de persona 1:</Label>
                            <Input placeholder="Donald Trump"></Input>
                          </div>
                        )}
                        {selectValue === "2" && (
                          <>
                            {" "}
                            <div className="">
                              <Label>Nombre completo de persona 1:</Label>
                              <Input placeholder="Donald Trump"></Input>
                            </div>
                            <div className="">
                              <Label>Nombre completo de persona 2:</Label>
                              <Input placeholder="Marcelo Tinelli"></Input>
                            </div>
                          </>
                        )}
                        {selectValue === "3" && (
                          <>
                            {" "}
                            <div className="">
                              <Label>Nombre completo de persona 1:</Label>
                              <Input placeholder="Donald Trump"></Input>
                            </div>
                            <div className="">
                              <Label>Nombre completo de persona 2:</Label>
                              <Input placeholder="Marcelo Tinelli"></Input>
                            </div>
                            <div className="">
                              <Label>Nombre completo de persona 3:</Label>
                              <Input placeholder="Leonardo Dicraprio"></Input>
                            </div>
                          </>
                        )}
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
