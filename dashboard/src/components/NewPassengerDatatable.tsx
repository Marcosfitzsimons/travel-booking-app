import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Phone, Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DefaultButton from "./DefaultButton";
import { toast } from "../hooks/ui/use-toast";
import SearchUserInput from "./SearchUserInput";

type UserDataTableProps = {
  columns: any;
  tripId: string | undefined;
};

type MyRowType = {
  _id: string;
};

const NewPassengerDatatable = ({ columns, tripId }: UserDataTableProps) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<unknown | boolean>(false);
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const navigate = useNavigate();

  const baseUrl = `https://fabebus-api-example.onrender.com/api/users`;

  const { data, error } = useFetch(baseUrl);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleAddPassenger = async (userId: string) => {
    setLoading(true);
    try {
      await axios.post(
        `https://fabebus-api-example.onrender.com/api/passengers/${userId}/${tripId}`,
        { userId: userId },
        { headers }
      );
      setLoading(false);
      toast({
        description: "Pasajero agregado con éxito.",
      });
      setTimeout(() => {
        navigate(`/trips/${tripId}`);
      }, 1000);
    } catch (err: any) {
      const errorMsg = err.response.data.msg;
      setLoading(false);
      setErr(errorMsg);
      toast({
        variant: "destructive",
        description: `Error al agregar pasajero, intentar más tarde. ${errorMsg}`,
      });
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 120,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative flex items-center">
                  <button className="px-[12px] pl-[29px] py-[2px] z-20 rounded-md border border-teal-800 bg-teal-800/60 text-white transition-colors hover:border-black font-semibold dark:border-teal-600 dark:bg-teal-700/60 dark:hover:text-inherit dark:hover:border-teal-500">
                    <Plus className="absolute left-3 top-[4px] h-4 w-4" />
                    Agregar
                  </button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Agregar pasajero al viaje
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-2">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-full relative flex flex-col items-center lg:basis-1/3">
                      <Avatar className="w-32 h-32">
                        <AvatarImage
                          className="origin-center hover:origin-bottom hover:scale-105 transition-all duration-200 z-90 align-middle"
                          src={params.row.image}
                          alt="avatar"
                        />
                        <AvatarFallback>
                          <User className="w-12 h-12" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col items-center">
                      <h3 className="font-medium text-xl dark:text-white ">
                        {params.row.fullName}
                      </h3>
                      <h4 className="text-[#737373]">@{params.row.username}</h4>
                    </div>
                    <div className="w-full flex flex-col items-center gap-5">
                      <ul className="flex flex-col w-full overflow-hidden bg-white gap-2 border border-border-color items-start p-4 shadow-inner rounded-md dark:bg-black/80 dark:border-border-color-dark dark:hover:border-blue-lagoon-300">
                        <li className="flex items-center gap-1">
                          <Mail className="h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
                          <span className="font-medium">Email:</span>
                          {params.row.email}
                        </li>
                        <li className="flex items-center gap-1">
                          <Phone className="h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300" />
                          <span className="font-medium">Celular:</span>{" "}
                          {params.row.phone}
                        </li>

                        <li className="flex items-center gap-1 shrink-0">
                          <MapPin className="h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300 shrink-0" />
                          <span className="font-medium shrink-0">
                            Dirrección Carmen:
                          </span>
                          <span className="shrink-0">
                            {params.row.addressCda}
                          </span>
                        </li>

                        <li className="flex items-center gap-1 shrink-0">
                          <MapPin className="h-4 w-4 text-blue-lagoon-900/60 dark:text-blue-lagoon-300 shrink-0" />
                          <span className="font-medium shrink-0">
                            Dirrecion Capital:
                          </span>
                          <span className="shrink-0">
                            {params.row.addressCapital}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className="flex justify-center my-4 lg:w-[11rem] mx-auto"
                    onClick={() => handleAddPassenger(params.row._id)}
                  >
                    <DefaultButton loading={loading}>
                      Agregar pasajero
                    </DefaultButton>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
      <div className="my-3">
        <SearchUserInput list={list} setFilteredList={setFilteredList} />
      </div>

      {filteredList.length > 0 ? (
        <DataGrid<MyRowType>
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
          pageSizeOptions={[9]}
          getRowId={(row) => row._id}
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
          className="w-[min(100%,1200px)] shadow-md border-border-color dark:border-border-color-dark dark:text-neutral-100"
        />
      ) : (
        <DataGrid<MyRowType>
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
          pageSizeOptions={[9]}
          getRowId={(row) => row._id}
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
          className="w-[min(100%,1200px)] shadow-md border-border-color dark:border-border-color-dark dark:text-neutral-100"
        />
      )}
    </div>
  );
};

export default NewPassengerDatatable;
