import NewTripForm from "../components/NewTripForm";
import SectionTitle from "../components/SectionTitle";

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
  id:
    | "name"
    | "date"
    | "from"
    | "to"
    | "departureTime"
    | "arrivalTime"
    | "maxCapacity"
    | "price";
  label: string;
  type: string;
  name: keyof Trip;
  placeholder?: string;
  validation?: InputValidation;
}

type NewTripProps = {
  inputs: TripInput[];
  title: string;
};

const NewTrip = ({ inputs, title }: NewTripProps) => {
  return (
    <section className="flex flex-col gap-5">
      <SectionTitle>{title}</SectionTitle>
      <div className="p-5 rounded-md bg-white/40 border border-blue-lagoon-500/20 dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300 dark:bg-[#141414]">
        <NewTripForm inputs={inputs} />
      </div>
    </section>
  );
};

export default NewTrip;
