import NewUserForm from "../components/NewUserForm";

const New = ({ inputs, title }) => {
  return (
    <section className="flex flex-col gap-5">
      <h1>{title}</h1>
      <div className="p-5 rounded-md border">
        <NewUserForm inputs={inputs} />
      </div>
    </section>
  );
};

export default New;
