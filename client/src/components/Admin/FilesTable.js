import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, Stack, Typography } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "department", headerName: "Department", width: 170 },
  { field: "subDepartment", headerName: "Sub-Department", width: 200 },
  { field: "filename", headerName: "Filename", width: 150 },
  { field: "size", headerName: "Size in kb", type: "number", width: 90 },
  { field: "createdAt", headerName: "Uploaded At", width: 150 },
];

export default function FilesTable() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/read/getAdminFiles")
      .then((res) => {
        // console.log(res.data.allFiles);
        setFiles(res.data.allFiles);
      })
      .catch((err) => console.log(err));
  }, []);

  const rows = files.map((file, index) => ({
    id: index + 1, // Ensure unique IDs starting from 1
    department: file.department,
    subDepartment: file.subDepartment,
    filename: file.fileName,
    size: file.size / 1000,
    createdAt: file.createdAt.substring(0, 10),
  }));

  return (
    <Stack
      style={{
        height: 400,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
      }}
    >
      <Typography variant="h6">Files Table</Typography>
      <Card sx={{ width: "65%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Card>
    </Stack>
  );
}
