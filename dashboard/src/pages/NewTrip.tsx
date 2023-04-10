import NewTripForm from "../components/NewTripForm";

const NewTrip = ({ inputs, title }) => {
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
