import React, { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  ProSidebarProvider,
} from "react-pro-sidebar";
import { Box, Typography, useTheme, Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import axios from "axios";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TopicIcon from "@mui/icons-material/Topic";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";

const files1 = [
  // {
  //   department: "Engineering",
  //   subDepartment: ["ECE", "Mechanical"],
  // },
  // {
  //   department: "Technology",
  //   subDepartment: ["Computer", "IT"],
  // },
  {
    department: "Payment Switch",
    subDepartment: ["Cortext", "IST Switch"],
  },
];

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      {!isCollapsed && <Typography>{title}</Typography>}
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [open, setOpen] = useState({});
  const [files, setFiles] = useState([]);
  const [subFile, setSubFile] = useState([]);
  const [col, setcol] = useState(-1);

  useEffect(() => {
    axios
      .get("http://localhost:3001/read/getAdminFiles")
      .then((res) => {
        // console.log("files for sidebar " + res.data.allFiles);
        setFiles(res.data.allFiles);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleToggle = async (department, index) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [department]: !prevOpen[department],
    }));

    console.log(department);

    // Fetch subdepartments for the selected department
    const fetchSubDepartments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/read/subdepartments/${department}`,
          {
            headers: {
              // Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("response.data.subDepartment " + response.data.subDepartment);
        setSubFile(response.data.subDepartment);
        // setSubDepartments(response.data.subDepartments || []);
        // setSelectedDepartment(department); // Set selected department
      } catch (error) {
        console.error("Error fetching subdepartments", error);
      }
    };

    await fetchSubDepartments();

    setcol(col === index ? -1 : index);
  };

  // Get unique categories
  const uniqueDepartment = [...new Set(files.map((book) => book.department))];
  const uniqueSubDepartment = [
    ...new Set(subFile.map((book) => book.subDepartment)),
  ];

  // console.log("uniqueSubDepartment " + uniqueSubDepartment);

  return (
    <Box
      backgroundColor={colors.primary[400]}
      minHeight="100vh"
      height="auto"
      overflow="auto"
      mr="3px"
      minWidth={isCollapsed ? undefined : "220px"}
    >
      <ProSidebarProvider collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}

          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={<MenuOutlinedIcon />}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[400],
            }}
          ></MenuItem>

          {/* MENU ITEMS  */}
          <Box padding={isCollapsed ? undefined : "1%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Files
            </Typography>
            {uniqueDepartment.map((department, index) => (
              <Box key={index}>
                <MenuItem
                  style={{
                    color: colors.grey[100],
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => handleToggle(department, index)}
                >
                  <Box display="flex" alignItems="center">
                    <TopicIcon />
                    {!isCollapsed && (
                      <Box
                        width="1"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        // ":hover"= {
                        // }
                        // backgroundColor="blue"
                      >
                        <Typography sx={{ ml: 1 }}>{department}</Typography>

                        {open[department] ? (
                          <KeyboardArrowDownOutlinedIcon />
                        ) : (
                          <ChevronRightOutlinedIcon />
                        )}
                      </Box>
                    )}
                  </Box>
                </MenuItem>
                <Collapse
                  // in={open[department]}
                  in={col === index}
                  timeout="auto"
                  unmountOnExit
                >
                  {uniqueSubDepartment.map((subDept, index) => (
                    <Item
                      key={index}
                      title={subDept}
                      to={`/file/${department}/${subDept}`}
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      isCollapsed={isCollapsed}
                    />
                  ))}
                </Collapse>
              </Box>
            ))}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Books
            </Typography>
            <Item
              title="CoopLibrary"
              to="/coopLibrary"
              icon={<MenuBookOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Announcement
            </Typography>
            <Item
              title="Announcement"
              to="/announcement"
              icon={<AnnouncementOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manage
            </Typography>
            <Item
              title="User"
              to="/user"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Files"
              to="/files"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Books"
              to="/books"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Notice"
              to="/manageAnnouncement"
              icon={<AnnouncementOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Add User"
              to="/userform"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Box>
        </Menu>
      </ProSidebarProvider>
    </Box>
  );
};

export default Sidebar;
