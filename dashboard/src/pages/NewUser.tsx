import NewUserForm from "../components/NewUserForm";
import SectionTitle from "../components/SectionTitle";

const NewUser = ({ inputs, title }) => {
  return (
    <section className="flex flex-col gap-5">
      <SectionTitle>{title}</SectionTitle>
      <div className="p-5 rounded-md bg-white/40 border border-blue-lagoon-500/20 dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300 dark:bg-black">
        <NewUserForm inputs={inputs} />
      </div>
    </section>
  );
};

export default NewUser;
