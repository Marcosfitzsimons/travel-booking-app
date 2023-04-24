import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "../hooks/ui/use-toast";
import DefaultButton from "./DefaultButton";
import DatePickerContainer from "./DatePickerContainer";

type Trip = {
  name: string;
  date: Date | null;
  from: string;
  departureTime: string;
  to: string;
  arrivalTime: string;
  maxCapacity: string;
  price: string;
};

interface InputValidation {
  required: {
    value: boolean;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}

interface TripInput {
  id: any;
  label: string;
  type: string;
  name: any;
  placeholder?: string;
  validation?: InputValidation;
}

type NewTripFormProps = {
  inputs: TripInput[];
};

const NewTripForm = ({ inputs }: NewTripFormProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [err, setErr] = useState<null | string>(null);
  console.log(startDate);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      date: null,
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
      await axios.post(
        "https://travel-booking-api-production.up.railway.app/api/trips",
        { ...data, date: startDate },
        { headers }
      );
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
        className="relative w-full flex flex-col gap-3 mt-6 p-3 py-6"
      >
        <div className="w-full flex flex-col gap-2 items-center lg:basis-2/3 lg:grid lg:grid-cols-2 lg:gap-3">
          <div className="grid w-full items-center gap-2 lg:w-[144px]">
            <Label htmlFor="date">Fecha</Label>
            <DatePickerContainer
              setStartDate={setStartDate}
              id="date"
              startDate={startDate}
            />
          </div>
          {inputs.map((input) => (
            <div key={input.id} className="grid w-full items-center gap-2">
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                type={input.type}
                id={input.id}
                placeholder={input.placeholder}
                {...register(input.id, input.validation)}
              />
              {errors[input.id as keyof typeof errors] && (
                <p className="text-red-600">
                  {errors[input.id as keyof typeof errors]?.message}
                </p>
              )}
            </div>
          ))}
          {err && <p className="text-red-600 self-start">{err}</p>}
        </div>
        <div className="mt-2 lg:flex lg:justify-end">
          <DefaultButton>Crear viaje</DefaultButton>
        </div>
      </form>
    </div>
  );
};

export default NewTripForm;
