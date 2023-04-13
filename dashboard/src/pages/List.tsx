import Datatable from "../components/Datatable";
import SectionTitle from "../components/SectionTitle";

interface UserColumn {
  field: string;
  headerName: string;
  width: number;
  renderCell?: (params: any) => JSX.Element;
}

type ListProps = {
  title: string;
  columns: UserColumn[];
  linkText: string;
};

const List = ({ title, columns, linkText }: ListProps) => {
  return (
    <section className="flex flex-col gap-5">
      <SectionTitle>{title}</SectionTitle>
      <Datatable columns={columns} linkText={linkText} />
    </section>
  );
};

export default List;
