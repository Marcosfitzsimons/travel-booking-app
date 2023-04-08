import NewForm from "../components/NewForm";

const New = ({ inputs, title }) => {
  return (
    <section className="flex flex-col gap-5">
      <h1>{title}</h1>
      <div className="p-5 rounded-md border">
        <NewForm inputs={inputs} />
      </div>
    </section>
  );
};

export default New;
