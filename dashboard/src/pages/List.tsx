import UserDatatable from "../components/UserDatatable";
import SectionTitle from "../components/SectionTitle";

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
      {/* UsersDatatable or tripsDatatable render conditionally */}
      <UserDatatable columns={columns} linkText={linkText} />
    </section>
  );
};

export default List;
