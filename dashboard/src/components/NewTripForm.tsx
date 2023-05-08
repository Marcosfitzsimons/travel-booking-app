import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "../hooks/ui/use-toast";
import DefaultButton from "./DefaultButton";
import DatePickerContainer from "./DatePickerContainer";
import TimePickerContainer from "./TimePickerContainer";
import ar from "date-fns/esm/locale/ar/index.js";

type Trip = {
  name: string;
  date: Date | null;
  from: string;
  departureTime: string; // or number
  to: string;
  arrivalTime: string; // or number
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
  const [arrivalTimeValue, setArrivalTimeValue] = useState("10:00");
  const [departureTimeValue, setDepartureTimeValue] = useState("10:00");
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
      date: null,
      from: "",
      departureTime: "10:00",
      arrivalTime: "10:00",
      to: "",
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
        {
          ...data,
          date: startDate,
          departureTime: departureTimeValue,
          arrivalTime: arrivalTimeValue,
        },
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
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="relative w-full flex flex-col gap-3 p-3 py-6"
    >
      <div className="w-full flex flex-col gap-2 items-center lg:basis-2/3 lg:grid lg:grid-cols-2 lg:gap-3">
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
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="date">Fecha</Label>
          <DatePickerContainer
            setStartDate={setStartDate}
            startDate={startDate}
          />
        </div>
        <div className="w-full flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:row-start-2 ">
          <div className="grid w-full items-center gap-2 lg:w-[144px]">
            <Label htmlFor="departureTime">Horario de salida:</Label>
            <TimePickerContainer
              value={departureTimeValue}
              onChange={setDepartureTimeValue}
            />
          </div>
          <div className="grid w-full items-center gap-2 lg:w-[144px]">
            <Label htmlFor="arrivalTime">Horario de llegada:</Label>
            <TimePickerContainer
              value={arrivalTimeValue}
              onChange={setArrivalTimeValue}
            />
          </div>
          {err && <p className="text-red-600 self-start">{err}</p>}{" "}
        </div>
        <div className="w-full mt-2 lg:w-[9rem] lg:justify-self-end lg:self-end">
          <DefaultButton>Crear viaje</DefaultButton>
        </div>
      </div>
    </form>
  );
};

export default NewTripForm;
