import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "../hooks/ui/use-toast";

type Trip = {
  name: string;
  date: string;
  from: string;
  departureTime: string;
  to: string;
  arrivalTime: string;
  maxCapacity: string;
  price: string;
};

const NewTripForm = ({ inputs }) => {
  const [err, setErr] = useState<null | string>(null);

  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      from: "",
      to: "",
      departureTime: "",
      arrivalTime: "",
      price: "",
      maxCapacity: "",
    },
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleOnSubmit = async (data: Trip) => {
    try {
      await axios.post("http://localhost:8800/api/trips", data, { headers });
      console.log(data);
      toast({
        description: "Viaje creado con éxito.",
      });
      navigate("/trips");
    } catch (err: any) {
      console.log(err);
      const errorMsg = err.response.data.err.message;
      setErr(errorMsg);
      toast({
        description: "Error al crear viaje. Intentar más tarde.",
      });
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="relative w-full mt-6 p-3 py-6"
      >
        <div className="w-full flex flex-col items-center lg:basis-2/3 lg:grid lg:grid-cols-2 lg:gap-3">
          {inputs.map((input) => (
            <div key={input.id} className="grid w-full items-center gap-2">
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                type={input.type}
                id={input.id}
                placeholder={input.placeholder}
                {...register(input.id, input.validation)}
              />
              {errors[input.id] && (
                <p className="text-red-600">{errors[input.id].message}</p>
              )}
            </div>
          ))}
          {err && <p className="text-red-600 self-start">{err}</p>}
          <div className="mt-2 lg:flex lg:self-end justify-end">
            <Button className="">Crear viaje</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTripForm;
