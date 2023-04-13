import Datatable from "../components/Datatable";

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
      <h1>{title}</h1>
      <Datatable columns={columns} linkText={linkText} />
    </section>
  );
};

export default List;
