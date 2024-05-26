import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Drawer, List, ListItem, ListItemText, Typography, ListItemButton, createTheme, Stack, Collapse } from '@mui/material';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthContext } from '../hooks/useAuthContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const drawerHeight = '82vh';

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  drawer: {
    width: '30%',
  },
  drawContainer: {
    overflowY: 'auto',
    height: drawerHeight,
  },
  listItemButton: {
    background: '#E9EEF3',
    width: '90%',
    borderRadius: 3,
    transition: '0.05s',
    '&.Mui-selected': {
      backgroundColor: '#5DADE2',
    }
  },
  listItemText: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  subListItemText: {
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function DrawerList1() {
  const { token } = useAuthContext();
  const theme = useTheme();
  const isNotPC = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();
  const location = useLocation();
  const [file, setFile] = useState([]);
  const [subFile, setSubFile] = useState([]);
  const [col, setcol] = useState(-1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/read/new", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // console.log("res.data.department:", response.data.department);
        setFile(response.data.department || []);
      } catch (error) {
        console.error("Error in drawer", error);
      }
    };

    fetchData();
  }, [token]);


  const handleClick = async (department, index) => {
    console.log(department);

    // Fetch subdepartments for the selected department
    const fetchSubDepartments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/read/subdepartments/${department}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("response.data.subDepartment " + response.data.subDepartment)
        setSubFile(response.data.subDepartment)
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
   const uniqueDepartment = [...new Set(file.map(book => book.department))];
   const uniqueSubDepartment = [...new Set(subFile.map(book => book.subDepartment))];
//    console.log("uniqueSubDepartment " + uniqueSubDepartment)

  return (
    <Container className={classes.root}>
 
      <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        sx={{
          '& .MuiDrawer-paper': {
            width: isNotPC ? '45%' : '27%',
            height: drawerHeight,
            marginTop: '105px',
            paddingTop: '15px',
          }
        }}
      > 

        
        <Container className={classes.drawContainer}>

          <Typography variant='h6'>
            List of Department
          </Typography>
          <List>
            {uniqueDepartment.map((department, index) => {
            //   const itemName = Array.isArray(item.department) && item.department.length > 0 ? item.department[0] : item.department;
            const itemName = department
            const pathName = decodeURIComponent(location.pathname);
              const isSelected = pathName.includes(itemName);

              return (
                <ListItem
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%', backgroundColor: '' }}
                  key={index}
                >
                  <ListItemButton
                    className={classes.listItemButton}
                    selected={isSelected}
                    onClick={() => handleClick(department, index)}
                    sx={{
                      transition: 'none',
                        background: '#E9EEF3',
                        width: '100%',
                        borderRadius: 3,
                        transition: '0.05s',
                        '&.Mui-selected': {
                          backgroundColor: '#5DADE2 ',
                          // color: 'white',
                          ":hover" : {
                        backgroundColor: '#5DADE2',
                        opacity: '0.5'
                      }
                        },
                        ":hover" : {
                          backgroundColor: '#5DADE2',
                          opacity: '0.5'
                        }
                        
                      }}
                  >
                    <ListItemText primary={department} classes={{ primary: classes.listItemText }} />

                  </ListItemButton>

                  <Stack sx={{width: '92%', backgroundColor: ''}}>
                    <Collapse in={col === index} timeout="auto" unmountOnExit>
                      <List sx={{width: '100%', backgroundColor: ''}}>
                        {uniqueSubDepartment !== null && uniqueSubDepartment.map((subDepartment, index) => (
                          <ListItem
                            key={index}
                            button
                            component={Link}
                            to={`/one/${department}/${subDepartment}`}
                            sx={{  ml: 3,mb:0.2, borderRadius: '5px' , backgroundColor: '#E9EEF3', borderRadius: 3}}
                          >
                            <ListItemText primary={subDepartment} classes={{ primary: classes.subListItemText }} />

                            {/* <ListItemText primary={subDepartment} sx={{ background: '', borderRadius: '5px',  }} /> */}
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </Stack>


                </ListItem>
              );
            })}
          </List>
        </Container>
      </Drawer>
    </Container>
  );
}

export default DrawerList1;
