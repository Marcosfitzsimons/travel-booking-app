import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Eye, Trash2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import SearchUserInput from "./SearchUserInput";

type User = {
  _id: string | undefined;
  username: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  addressCda: string | undefined;
  addressCapital?: string | undefined;
  phone: number | undefined;
  image?: string | undefined;
};

interface Column {
  field: string;
  headerName: string;
  width: number;
  renderCell?: (params: any) => JSX.Element;
}

type DataTableProps = {
  columns: Column[];
  linkText: string;
};

type ExtendedColumn = Column & {
  renderCell?: (params: any) => JSX.Element;
};

const UsersDatatable = ({ columns, linkText }: DataTableProps) => {
  const [list, setList] = useState<User[]>([]);
  const [filteredList, setFilteredList] = useState<User[]>([]);

  const baseUrl = `https://travel-booking-api-production.up.railway.app/api/users`;

  const { data, loading, error } = useFetch(baseUrl);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/${id}`, {
        headers,
      });
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn: ExtendedColumn[] = [
    {
      field: "action",
      headerName: "Acción",
      width: 180,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Eye className="absolute left-2 h-4 w-4" />
              <Link
                to={`/users/${params.row._id}`}
                className="px-3 bg-transparent pl-7 z-20 rounded-md border border-blue-lagoon-200 hover:border-blue-lagoon-600/50 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:bg-black dark:hover:border-blue-lagoon-300/80 dark:bg-transparent"
              >
                Ver
              </Link>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="relative flex items-center">
                  <Trash2 className="absolute cursor-pointer left-2 h-4 w-4" />
                  <button
                    className={`px-2 pl-7 rounded-md border border-red-500 bg-red-500 hover:border-blue-lagoon-600/50 dark:border-red-600 dark:bg-red-600 dark:hover:border-blue-lagoon-300/80`}
                  >
                    Borrar
                  </button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no podrá deshacerse. Esto eliminará
                    permanentemente este usuario.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col-reverse gap-1 md:flex-row md:justify-end">
                  <AlertDialogCancel className="md:w-auto">
                    No, volver al listado de usuarios
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(params.row._id)}
                    className="md:w-auto"
                  >
                    Si, borrar usuario
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
      <div className="w-full my-3 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
        <SearchUserInput list={list} setFilteredList={setFilteredList} />
        <div className="relative flex items-center my-1 self-end bg-white rounded-md dark:bg-transparent">
          <UserPlus className="absolute cursor-pointer left-3 h-5 w-5" />
          <Link
            to="/users/new"
            className="px-3 py-1 pl-9 z-20 bg-transparent rounded-md border border-blue-lagoon-200 shadow-md hover:border-blue-lagoon-600/50 dark:border-blue-lagoon-300/60 dark:text-blue-lagoon-100 dark:bg-[#141414] dark:hover:border-blue-lagoon-300/80 dark:bg-transparent"
          >
            {linkText}
          </Link>
        </div>
      </div>
      {filteredList.length > 0 ? (
        <DataGrid
          rows={filteredList}
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
          getRowId={(row) => row._id ?? ""}
          className="w-[min(100%,1000px)] text-blue-lagoon-800 bg-white/40 shadow-md border border-blue-lagoon-500/20 dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300 dark:bg-[#141414] dark:text-neutral-100"
        />
      ) : (
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
          getRowId={(row) => row._id ?? ""} // ?? operator is used to provide a default value of an empty string '' if row._id is null or undefined.
          className="w-[min(100%,1000px)] text-blue-lagoon-800 bg-white/40 shadow-md border border-blue-lagoon-500/20 dark:border-blue-lagoon-300/60 dark:hover:border-blue-lagoon-300 dark:bg-[#141414] dark:text-neutral-100"
        />
      )}
    </div>
  );
};

export default UsersDatatable;
