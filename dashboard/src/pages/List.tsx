import UsersDatatable from "../components/UsersDatatable";
import SectionTitle from "../components/SectionTitle";
import TripsDatatable from "../components/TripsDatatable";
import { useLocation } from "react-router-dom";
import PublicationsDatatable from "../components/PublicationsDatatable";

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
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <section className="flex flex-col gap-5">
      <SectionTitle>{title}</SectionTitle>
      {path === "users" ? (
        <UsersDatatable columns={columns} linkText={linkText} />
      ) : path === "trips" || path === "" ? (
        <TripsDatatable columns={columns} linkText={linkText} />
      ) : path === "publications" ? (
        <PublicationsDatatable columns={columns} linkText={linkText} />
      ) : null}
    </section>
  );
};

export default List;
