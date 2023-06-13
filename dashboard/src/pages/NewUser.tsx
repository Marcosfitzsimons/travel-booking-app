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
  id: any;
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
      <div className="p-2 w-full max-w-lg self-center rounded-md bg-white/40 border border-border-color shadow-md lg:w-full lg:max-w-6xl dark:border-border-color-dark dark:hover:border-zinc-500 dark:bg-black">
        <NewUserForm inputs={inputs} />
      </div>
    </section>
  );
};

export default NewUser;
