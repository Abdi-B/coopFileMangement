import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "department", headerName: "Department", flex: 1 },
  { field: "subDepartment", headerName: "Sub-Department", flex: 1 },
  { field: "filename", headerName: "Filename", flex: 1 },
  { field: "size", headerName: "Size in kb", type: "number", flex: 1 },
  { field: "createdAt", headerName: "Uploaded At", flex: 1 },
  // { field: "action", headerName: "Action", flex: 1 },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: () => {
      return (
        <Box>
          <IconButton>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton>
            <DeleteForeverOutlinedIcon />
          </IconButton>
          <IconButton>
            <SaveOutlinedIcon />
          </IconButton>
        </Box>
      );
    },
  },
];

const FileTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    <Box m="20px">
      <Header
        title="Books Information"
        subtitle="List of Books for a Reference"
      />
      <Box
        m="40px 0 0 0"
        // height="auto"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            // borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[600],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: `${colors.blueAccent[700]} !important`,
            borderBottom: "none",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              color: `${colors.grey[100]}`,
            },
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default FileTable;
