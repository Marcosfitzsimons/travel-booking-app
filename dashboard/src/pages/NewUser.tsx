import NewUserForm from "../components/NewUserForm";

const NewUser = ({ inputs, title }) => {
  return (
    <section className="flex flex-col gap-5">
      <h1>{title}</h1>
      <div className="p-5 rounded-md border">
        <NewUserForm inputs={inputs} />
      </div>
    </section>
  );
};

export default NewUser;
