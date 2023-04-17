import BackButton from "../components/BackButton";
import NewUserForm from "../components/NewUserForm";
import SectionTitle from "../components/SectionTitle";

interface InputValidation {
  required: {
    value: boolean;
    message: string;
  };
  minLength: {
    value: number;
    message: string;
  };
  maxLength: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}

interface UserInput {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  validation?: InputValidation;
}

type NewUserProps = {
  inputs: UserInput[];
  title: string;
};

const NewUser = ({ inputs, title }: NewUserProps) => {
  return (
    <section className="flex flex-col gap-5">
      <SectionTitle>{title}</SectionTitle>
      <div className="self-start mb-2">
        <BackButton linkTo="/users" />
      </div>
      <div className="p-5 rounded-md bg-white/40 border border-blue-lagoon-500/20 shadow-md dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300 dark:bg-black">
        <NewUserForm inputs={inputs} />
      </div>
    </section>
  );
};

export default NewUser;
