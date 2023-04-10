import Datatable from "../components/Datatable";

const List = ({ title, columns, linkText }) => {
  return (
    <section className="flex flex-col gap-5">
      <h1>{title}</h1>
      <Datatable columns={columns} linkText={linkText} />
    </section>
  );
};

export default List;
