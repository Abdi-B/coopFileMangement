import { Box, Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <Box m="20px 0 0 5px">
      {/* <Typography>Dashboard</Typography> */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to our dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;
