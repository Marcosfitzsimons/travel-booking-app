import NewTripForm from "../components/NewTripForm";

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
  id: string;
  label: string;
  type: string;
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
      <h1>{title}</h1>
      <div className="p-5 rounded-md border">
        <NewTripForm inputs={inputs} />
      </div>
    </section>
  );
};

export default NewTrip;
