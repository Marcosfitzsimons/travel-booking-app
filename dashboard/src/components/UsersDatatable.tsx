import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Eye, Trash2, User, UserPlus, Users } from "lucide-react";
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
import { toast } from "../hooks/ui/use-toast";

type addressCda = {
  street: string;
  streetNumber: number | null;
  crossStreets: string;
};

type User = {
  _id: string | undefined;
  username: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  dni: number | undefined;
  addressCda: addressCda | undefined;
  addressCapital: string | undefined;
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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<any>(false);
  const baseUrl = `https://fabebus-api-example.onrender.com/api/users`;

  const { data, loading, error } = useFetch(baseUrl);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`${baseUrl}/${id}`, {
        headers,
      });
      setList(list.filter((item) => item._id !== id));
      setIsLoading(false);
      toast({
        description: "Usuario eliminado con éxito.",
      });
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setIsLoading(false);
      setIsError(errorMsg);
      toast({
        variant: "destructive",
        description: "Error al eliminar usuario, intentar más tarde.",
      });
    }
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
              <Link
                to={`/users/${params.row._id}`}
                className="px-[12px] pl-[29px] py-[2px] z-20 rounded-md border border-teal-800 bg-teal-800/60 text-white transition-colors hover:border-black font-semibold dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500"
              >
                <Eye className="absolute left-3 top-[4px] h-4 w-4" />
                Ver
              </Link>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="relative flex items-center">
                  <button className="px-[12px] pl-[29px] py-[2px] rounded-md border border-neutral-600 bg-[#b4343a] text-white font-semibold transition-colors hover:border-black dark:bg-[#b4343a] dark:border-blue-lagoon-400/80 dark:hover:border-blue-lagoon-300">
                    <Trash2 className="absolute text-white left-3 top-[4px] h-4 w-4" />
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
    <div className="h-[600px] w-full">
      <div className="w-full my-3 flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          {error && <p className="text-red-500 order-2">{error.message}</p>}
          {isError && <p className="text-red-500 order-2">{isError}</p>}
          {isLoading && <p className="text-red-500 order-2">is loading...</p>}
          <SearchUserInput list={list} setFilteredList={setFilteredList} />
        </div>
        <div className="w-full flex items-end justify-between sm:w-auto sm:gap-3">
          <div className="flex items-center gap-1 text-sm lg:text-base">
            <Users className="animate-pulse h-5 w-5" />
            <p className="font-medium">
              Usuarios{" "}
              <span className="hidden sm:inline-flex">registrados</span>:
            </p>
            <p className="font-light">{list.length > 0 && list.length}</p>
          </div>
          <div className="relative flex items-center self-end">
            <Link
              to="/users/new"
              className="px-3.5 py-1 pl-[32px] z-20 rounded-md border border-teal-800 bg-teal-800/60 text-white font-semibold transition-colors hover:border-black dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500"
            >
              <UserPlus className="absolute cursor-pointer left-3 top-[6px] h-5 w-5" />
              {linkText}
            </Link>
          </div>
        </div>
      </div>
      {filteredList.length > 0 ? (
        <DataGrid
          rows={filteredList}
          columns={actionColumn.concat(columns)}
          checkboxSelection
          hideFooterSelectedRowCount
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 9,
              },
            },
          }}
          sx={{
            borderColor: "#007F9633",
            borderRadius: "7px",
            "&>.MuiDataGrid-main": {
              "&>.MuiDataGrid-columnHeaders": {
                borderBottom: "none",
              },

              "& div div div div >.MuiDataGrid-cell": {
                borderBottom: "none",
              },
            },
            "&>.MuiDataGrid-footerContainer": {
              borderTop: "none",
            },
          }}
          pageSizeOptions={[9]}
          getRowId={(row) => row._id ?? ""}
          className="w-[min(100%,1200px)] shadow-md border-border-color dark:border-border-color-dark dark:text-neutral-100"
        />
      ) : (
        <DataGrid
          rows={list}
          columns={actionColumn.concat(columns)}
          checkboxSelection
          hideFooterSelectedRowCount
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 9,
              },
            },
          }}
          sx={{
            borderColor: "#007F9633",
            borderRadius: "7px",
            "&>.MuiDataGrid-main": {
              "&>.MuiDataGrid-columnHeaders": {
                borderBottom: "none",
              },

              "& div div div div >.MuiDataGrid-cell": {
                borderBottom: "none",
              },
            },
            "&>.MuiDataGrid-footerContainer": {
              borderTop: "none",
            },
          }}
          pageSizeOptions={[9]}
          getRowId={(row) => row._id ?? ""} // ?? operator is used to provide a default value of an empty string '' if row._id is null or undefined.
          className="w-[min(100%,1200px)] shadow-md border-border-color dark:border-border-color-dark dark:text-neutral-100"
        />
      )}
    </div>
  );
};

export default UsersDatatable;
