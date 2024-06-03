import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@mui/material/styles"; // Use useTheme from @mui/material/styles

import React, { useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import DrawerList from "./DrawerList";
import Navbar from "./Navbar";
import Announcement from "./Announcement";
import AppContext from "../context/AppContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import DrawerList1 from "./DrawerList2";
import Navbar2 from "./Navbar2";

const useStyles = makeStyles((theme) => ({
  page: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // [theme.breakpoints.down('sm')]: {
    //   backgroundColor: 'lightblue', // Mobile
    // },
    // [theme.breakpoints.between('sm', 'md')]: {
    //   backgroundColor: 'lightgreen', // Tablet
    // },
    // [theme.breakpoints.up('md')]: {
    //   backgroundColor: 'lightcoral', // PC
    // },
  },

  layout: {
    width: "100%",
    display: "flex",
    flexGrow: 1,
  },

  drawer: {
    // [theme.breakpoints.up('md')]: {
    //   backgroundColor: 'lightcoral', // PC
    // },
    // display: 'none',
    // backgroundColor: "gray",
  },
  
  announcement: {
    // display: 'none',
    backgroundColor: "gray",
    height: "auto",
  },
}));

function Layout({ children }) {
  const { navbar, nameContext } = useContext(AppContext);
  const classes = useStyles();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("isMobile " + isMobile);
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isPC = useMediaQuery(theme.breakpoints.up("md"));
  const aboveMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const notPC = useMediaQuery(theme.breakpoints.down("md"));
  // console.log("useMediaQuery is pc " + isPC);

  const announcementStyles = {
    display: isMobile ? "none" : "block",
  };

  return (
    <Stack className={classes.page}>
      {<Navbar />}

      <Box className={classes.layout}>{children}</Box>
      {nameContext && <DrawerList1 className={classes.drawer} />}
      {nameContext && <Announcement />}
    </Stack>
  );
}

export default Layout;
