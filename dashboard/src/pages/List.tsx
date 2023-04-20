import UsersDatatable from "../components/UsersDatatable";
import SectionTitle from "../components/SectionTitle";
import TripsDatatable from "../components/TripsDatatable";

interface Column {
  field: string;
  headerName: string;
  width: number;
  renderCell?: (params: any) => JSX.Element;
}

type ListProps = {
  title: string;
  columns: Column[];
  linkText: string;
};

const List = ({ title, columns, linkText }: ListProps) => {
  return (
    <section className="flex flex-col gap-5">
      <SectionTitle>{title}</SectionTitle>
      {title === "Viajes" ? (
        <TripsDatatable columns={columns} linkText={linkText} />
      ) : (
        <UsersDatatable columns={columns} linkText={linkText} />
      )}
    </section>
  );
};

export default List;
