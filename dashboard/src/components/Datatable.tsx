import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Edit,
  Eye,
  Plus,
  PlusCircle,
  Trash,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useFetch from "../hooks/useFetch";
import axios from "axios";

interface UserColumn {
  field: string;
  headerName: string;
  width: number;
  renderCell?: (params: any) => JSX.Element;
}

type DataTableProps = {
  columns: UserColumn[];
  linkText: string;
};

const Datatable = ({ columns, linkText }: DataTableProps) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const baseUrl = `https://travel-booking-api-production.up.railway.app/api/${path}`;

  const { data, loading, error } = useFetch(baseUrl);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://travel-booking-api-production.up.railway.app/api/${path}/${id}`,
        {
          headers,
        }
      );
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Eye className="absolute cursor-pointer left-2 h-4 w-4" />
              <Link
                to={`/${path}/${params.row._id}`}
                className={`px-3 pl-7 rounded-md border border-blue-lagoon-200 bg-white hover:border-blue-lagoon-600/50 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:bg-black dark:hover:border-blue-lagoon-300/80`}
              >
                Ver
              </Link>
            </div>
            <div className="relative flex items-center">
              {/* Add alert in onClick delete button */}
              <Trash2 className="absolute cursor-pointer left-2 h-4 w-4" />
              <button
                onClick={() => handleDelete(params.row._id)}
                className={`px-2 pl-7 rounded-md border border-red-500 bg-red-500 hover:border-blue-lagoon-600/50 dark:border-red-600 dark:bg-red-600 dark:hover:border-blue-lagoon-300/80`}
              >
                Borrar
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <div className="h-[400px] w-full">
      <div className="w-full my-3 flex items-center justify-end">
        <div className="relative">
          {path === "users" ? (
            <UserPlus className="absolute cursor-pointer left-3 h-5 w-5" />
          ) : (
            <PlusCircle className="absolute cursor-pointer left-3 top-[4px] h-4 w-4" />
          )}
          <Link
            to={`/${path}/new`}
            className={`px-3 py-1 ${
              path === "users" ? "pl-9" : "pl-8"
            } rounded-md border border-blue-lagoon-200 bg-white hover:border-blue-lagoon-600/50 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:bg-black dark:hover:border-blue-lagoon-300/80`}
          >
            {linkText}
          </Link>
        </div>
      </div>
      <DataGrid
        rows={list}
        columns={actionColumn.concat(columns)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 9,
            },
          },
        }}
        pageSizeOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        className="w-[min(100%,1000px)] text-blue-lagoon-800 bg-white/40 border border-blue-lagoon-500/20 dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300 dark:bg-transparent dark:text-neutral-100"
      />
    </div>
  );
};

export default Datatable;
