import BackButton from "../components/BackButton";
import NewSpecialTripForm from "../components/NewSpecialTripForm";
import NewTripForm from "../components/NewTripForm";
import SectionTitle from "../components/SectionTitle";

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

type NewTripProps = {
  inputs: TripInput[];
  title: string;
};

const NewSpecialTrip = ({ inputs, title }: NewTripProps) => {
  return (
    <section className="flex flex-col gap-5">
      <SectionTitle>{title}</SectionTitle>
      <div className="self-start mb-2">
        <BackButton linkTo="/special-trips" />
      </div>
      <div className="p-5 rounded-md bg-white/40 w-full max-w-md self-center border border-border-color dark:border-border-color-dark dark:hover:border-blue-lagoon-300 dark:bg-black/40 lg:max-w-3xl lg:self-start">
        <NewSpecialTripForm inputs={inputs} />
      </div>
    </section>
  );
};

export default NewSpecialTrip;
