import {React, useEffect,useState} from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/styles'
import { Container, Drawer,Toolbar, List, ListItem, ListItemText, Typography,Box, ListItemButton, Stack, Collapse, AppBar, createTheme } from '@mui/material'

import Home from './Home'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthContext } from '../hooks/useAuthContext';
import Department from '../pages/Department';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';  

const drawerHeight = '82vh';

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
// const useStyles = makeStyles({

    root: {
        display: 'flex',
    },
    drawer: {
        width: '30%',
        // marginTop: '70px',
    },
    // drawerPaper: {
    //     // flexShrink: 1,
    //     width: '27%',
    //     height: drawerHeight,
    //     marginTop: '105px',
    //     paddingTop: '15px',
    // },
    // drawerPaper: ({ isNotPC }) => ({
        
    //     width: isNotPC ? ('40%') : ('30%'),
    //     height: drawerHeight,
    //     marginTop: '105px',
    //     paddingTop: '15px',
        
        
    // }),
    drawContainer: {
        overflowY: 'auto',
        height: drawerHeight,
        // marginTop: 105,
    },
    active: {
        background: 'blue',
        color: 'white',
        // fontWeight: 'bold',
        transition: '0.05s'
    },
    notActive: {
        background: 'gray'
    },
 
}));

function DrawerList() {

    const {token} = useAuthContext();
    // console.log("token in drawer", token)

    const theme = useTheme();
    const isNotPC = useMediaQuery(theme.breakpoints.down('md'));
    console.log("isNotPC in drawer list " + isNotPC)


    // const classes = useStyles({isNotPC});
    const classes = useStyles();
    const location = useLocation();

    const [col, setcol] = useState(-1);

    const [file, setFile] = useState([]);
    const [detail, setDetail] = useState([]);

    useEffect(  () => {

        const token2 = localStorage.getItem('token');

         axios.get("http://localhost:3001/read", {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then((res) => {
                if(res.data.directoriesInfo) {
                    setFile(res.data.directoriesInfo);
                } else {
                    setFile(null)
                }
            })
            .catch((err) => console.error("Error in drawer",err));
    }, [token]);
    
    const  handleClick = async (item, index) => {
        // console.log(item.name, index)

        await axios({
            url: `http://localhost:3001/read/${item.name}`,
            method: "get",
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
            .then((res) => {
                // console.log(res.data.directoriesInfo)
                if(res.data.directoriesInfo) {
                    setDetail(res.data.directoriesInfo);
                }
                else {
                    setDetail(null)
                }
                // console.log(detail)
            })
            .catch((err) => console.log(err));


         setcol(col === index ? -1 : index);

    };
    const handleClick2 =  (item,item2, index) => {
        console.log(item,item2, index)

    };
    const normalizeString = (str) => {
        return encodeURIComponent(str.trim().toLowerCase());
  };


    // const isNotPCMedia = {
    //     width: isNotPC ? '40%' : '30%'
    // }

    
  return (
        <Container  className={classes.root}  >

            <Navbar />

            <Drawer 
            // sx={{ width: isNotPC ? '40%' : '30%' }}
            className={classes.drawer}
            variant = 'permanent'
            anchor='left'
            // classes={{paper: classes.drawerPaper}}
            sx={{
                // width: isNotPC ? '40%' : '30%',
                '& .MuiDrawer-paper': {
                    width: isNotPC ? '45%' : '27%',
                    height: drawerHeight,
                    marginTop: '105px',
                    paddingTop: '15px',
                }
            }}
            
            > 

            <Container className={classes.drawContainer}>
                <Typography variant='h6' >
                    List of Department
                </Typography>
                <List >

                {file !== null && file.map((item, index) => {
                    const itemName = (item.name);
                    // console.log("itemName " + itemName);
                    // console.log(location.pathname)
                    // const pathName = normalizeString(decodeURIComponent(location.pathname));
                    const pathName = decodeURIComponent(location.pathname);
                    // console.log("pathName " + pathName)

                    const isSelected = pathName.includes(itemName);
                    // console.log("isSelected " + isSelected)

              return (
                <ListItem
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}
                  key={index}
                >
                  <ListItemButton
                    sx={{
                      background: '#E9EEF3',
                      width: '90%',
                      borderRadius: 3,
                      transition: '0.05s',
                      '&.Mui-selected': {
                        backgroundColor: '#5DADE2 ',
                        // color: 'white',
                      }
                    }}
                    selected={isSelected}
                    onClick={(e) => handleClick(item, index)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>

                  <Stack>
                    <Collapse in={col === index} timeout="auto" unmountOnExit>
                      <List>
                        {detail !== null && detail.map((item2, index) => (
                          <ListItem
                            key={index}
                            button
                            component={Link}
                            to={`/one/${item.name}/${item2.name}`}
                            sx={{ background: '', width: '100%', ml: 3 }}
                          >
                            <ListItemText primary={item2.name} sx={{ background: '', borderRadius: '5px', padding: '3px' }} />
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
  )
}

export default DrawerList
