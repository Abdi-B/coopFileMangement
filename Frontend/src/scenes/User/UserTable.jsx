import React, { useEffect, useState } from "react";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { role as originalRole } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";

// Preprocess the role data to include fullName
const role = originalRole.map((user) => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`,
}));

const UserTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //   console.log("role of user ", role);

  const [users, setUsers] = useState([]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "role",
      headerName: "Access Role",
      flex: 1,
      cellClassName: "role-column--cell",
      headerAlign: "center",
      renderCell: (params) => {
        const { role } = params.row;
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "superAdmin"
                ? colors.greenAccent[700]
                : colors.greenAccent[800]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "user" && <SecurityOutlinedIcon />}
            {role === "superAdmin" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/user/getAllUsers")
      .then((res) => {
        console.log("users : " + res.data.users);
        setUsers(res.data.users); 
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="Managing Users Data" />
      <Box
        mt="10px"
        height="auto"
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
          "& .MuiDataGrid-columnHeader": {
            borderBottom: "none",
            backgroundColor: `${colors.blueAccent[700]} !important`,
            borderBottom: "none",

            "& .MuiDataGrid-columnHeaderTitle": {
              //   color: `${colors.blueAccent[500]}`,
            },
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={role} columns={columns} />
      </Box>
    </Box>
  );
};

export default UserTable;
