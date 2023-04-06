import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../datatablesource";

const Datatable = () => {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div className="flex items-center gap-2">
            <div className="py-1 px-2 rounded-md border border-blue-lagoon-900/70">
              View
            </div>
            <div className="py-1 px-2 rounded-md border border-red-600">
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%", maxWidth: "600px" }}>
      <DataGrid
        rows={userRows}
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
