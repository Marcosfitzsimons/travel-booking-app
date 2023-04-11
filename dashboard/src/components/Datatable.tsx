import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useFetch from "../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns, linkText }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const baseUrl = `http://localhost:8800/api/${path}`;

  const { data, loading, error } = useFetch(baseUrl);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/${path}/${id}`, {
        headers,
      });
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const handleSinglePage = (id) => {
    navigate(`/${path}/${id}`);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleSinglePage(params.row._id)}
              className="py-1 px-2 rounded-md border border-blue-lagoon-900/70"
            >
              View
            </Button>
            <Button
              className="py-1 px-2 rounded-md border border-red-600"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </Button>
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
          <UserPlus className="-z-10 absolute left-2 h-5 w-5" />
          <Link
            to={`/${path}/new`}
            className="px-2 py-1 w-full pl-8 max-w-[10rem] rounded-md border"
          >
            {linkText}
          </Link>
        </div>
      </div>
      <DataGrid
        rows={list}
        columns={columns.concat(actionColumn)}
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
        className="text-blue-lagoon-800 dark:text-neutral-200"
      />
    </div>
  );
};

export default Datatable;
