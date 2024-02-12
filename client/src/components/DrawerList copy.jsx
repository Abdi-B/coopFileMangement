import {React, useEffect,useState} from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/styles'
import { Container, Drawer,Toolbar, List, ListItem, ListItemText, Typography,Box, ListItemButton, Stack, Collapse, AppBar, createTheme } from '@mui/material'

import Home from './Home'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';


const theme = createTheme();
const useStyles = makeStyles((theme) => ({
// const useStyles = makeStyles({

    root: {
        display: 'flex',
    },
    drawer: {
        width: '30%',
        marginTop: '70px',
    },
    drawerPaper: {
        // flexShrink: 1,
        width: '27%',
        height: 'auto',
        marginTop: '70px',
    },
    drawContainer: {
        // height: '100%',
        // marginTop: 105,
    },
    active: {
        background: 'blue',
        color: 'white',
        // fontWeight: 'bold',
        transition: '0.05s'
    },
    notActive: {
        background: 'red'
    },
    scrollableContainer: {
        overflowY: '100%',
        // maxHeight: `calc(100% - ${theme.spacing(6)}px)`, // Adjust the spacing as needed
      },
}));

function DrawerList() {
    const classes = useStyles();
    const location = useLocation();

    const [col, setcol] = useState(-1);
    const [col2, setcol2] = useState(-1);

    const [file, setFile] = useState([]);
    const [detail, setDetail] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:3001/read")
            .then((res) => {
                if(res.data.directoriesInfo) {
                    setFile(res.data.directoriesInfo);
                } else {
                    setFile(null)
                }
                
            })
            .catch((err) => console.log(err));
    }, []);
    
    const  handleClick = async (item, index) => {
        console.log(item.name, index)

        await axios({
            url: `http://localhost:3001/read/${item.name}`,
            method: "get"
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

        // setcol2(col2 === index ? -1 : index);

    };

  return (
        <Container  className={classes.root} >

            <Navbar />

            <Drawer 
            className={classes.drawer}
            variant = 'permanent'
            anchor='left'
            classes={{paper: classes.drawerPaper,}}
            > 
            {/* <Toolbar />
            <Toolbar /> */}
            <Container className={classes.drawContainer}>
                <Typography variant='h6' >
                    List of Departments 
                </Typography>
                <List >

                    {file !== null && file.map((item,index) => (
                    <ListItem
                            sx={{display: 'flex',flexDirection: 'column', alignItems: 'start'}}
                            key={index} 
                            // button
                            // component={Link}
                            // to={`/one/${item}`}
                            // onClick={(e) => handleClick(item, index)}
                            // className={location.pathname === `/one/${encodeURIComponent(item)}` ? classes.active: classes.notActive}
                            >
                                {/* <ListItemText primary={item}  /> */}
                            <ListItemButton sx={{background: '#E9EEF3', width: '90%', borderRadius: 3}}
                            ><ListItemText primary={item.name}  onClick={(e) => handleClick(item, index)}/> </ListItemButton>
                            
                            {/* <ListItemText primary={`/one/${encodeURIComponent(item)}`}/>
                            <ListItemText primary={location.pathname}/> */}

                            <Stack>
                                <Collapse in={col === index} timeout="auto" unmountOnExit>
                                    <List >
                                    {detail !== null && detail.map((item2, index) => (
                                        // if (!item2.includes(".")){
                                            // return (
                                                <ListItem 
                                                    key={index} 
                                                    button
                                                    component={Link}
                                                    to={`/one/${item.name}/${item2.name}`}
                                                    sx={{background: '', width: '100%',ml:3}}
                                                    // onClick={(e) => handleClick2(item,item2, index)}
                                                    // className={location.pathname === `/one/${encodeURIComponent(item)}/${encodeURIComponent(item2)}/${encodeURIComponent(item2)}` ? classes.active: classes.notActive}
                                                >
                                                    {/* <ListItemButton sx={{background: '#C1DDF9 ', width: '100%',ml:3}}><ListItemText primary={item2}  onClick={(e) => handleClick2(item,item2, index)}/> </ListItemButton> */}
                                                    <ListItemText primary={item2.name}  />
                                                        {/* <ListItemText primary={`/one/${encodeURIComponent(item)}/${encodeURIComponent(item2)}`}/>  */}
                                                        {/* <ListItemText primary={location.pathname}/>  */}

                                                </ListItem>
                                            // )
                                            

                                        // }
                                    )
                                    )}
                                    </List>
                                </Collapse>
                            </Stack>
                        </ListItem>
                    
                    )
                    )}
                </List>
            </Container>
            </Drawer>


        </Container>
  )
}

export default DrawerList