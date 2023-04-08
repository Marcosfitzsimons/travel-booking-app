import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../datatablesource";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Datatable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <Link
              to="/usuarios/test"
              className="py-1 px-2 rounded-md border border-blue-lagoon-900/70"
            >
              View
            </Link>
            <Button
              className="py-1 px-2 rounded-md border border-red-600"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="h-[400px] w-full">
      <div className="w-full my-3 flex items-center justify-end">
        <div className="relative">
          <UserPlus className="-z-10 absolute left-2 h-5 w-5" />
          <Link
            to="/usuarios/usuario-nuevo"
            className="px-2 py-1 w-full pl-8 max-w-[10rem] rounded-md border"
          >
            Add New User
          </Link>
        </div>
      </div>
      <DataGrid
        rows={data}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 9,
            },
          },
        }}
        pageSizeOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
