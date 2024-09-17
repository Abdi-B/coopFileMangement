import { Box, Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";

const Dashboard = () => {
  return (
    <Box m="20px 0 0 5px">
      {/* <Typography>Dashboard</Typography> */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to our dashboard" />
      </Box>

      <Box
        m="10px"
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap="10px"
      >
        <Box height="370px">
          <PieChart />
        </Box>
        <Box height="370px">
          <BarChart />
        </Box>
        <Box height="400px">
          <LineChart />
        </Box> 
      </Box>
    </Box>
  );
};

export default Dashboard;
