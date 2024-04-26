import {React, useContext, } from 'react'
import { AppBar,Toolbar, IconButton,Typography,Stack } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import  logo  from "./../assets/cbo.png";
import { makeStyles } from '@material-ui/styles';
// import { useGlobalState } from './GlobalStateContext';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

// import { CatchingPokemon } from '@mui/icons-material'
// import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles({
  appBar1: {
   
    height: 100,
    //  background: '#E9EEF3',
    //  p: 1,
  },
  
});

const changeContext = () => {
  // toggleDrawerList
  // toggleAnnouncement
  // context.SetNameContext(false);

};



function Navbar() {
  // const {  toggleDrawerList, toggleAnnouncement } = useGlobalState();

  const context = useContext(AppContext);
  const {token } = useAuthContext();

  const { logout} = useLogout();


  const handleLogout = () => {
    logout()
  }


    const classes = useStyles();
  return (
    <AppBar position='fixed' className={classes.appBar1} 
      sx={{backgroundColor: '#6495ED'}}>
        <Toolbar sx={{justifyContent: "space-between", display: 'flex', alignItems: 'center', }}>
            <Box  edge='center'  variant="rounded"
                sx={{ width: 150, height: 80, backgroundColor:'white' ,}}>
                {/* <CatchingPokemon></CatchingPokemon> */}
                {/* <Paper elevation={0} /> */}
                <CardMedia 
                  component="img"
                  image={logo}
                  alt="logo"
                />
                
            </Box>

            <Stack direction='row' spacing={2}>
            
              <Button color='primary' component={Link} to="one/Banking%20Operations/One" onClick={() => {
                context.SetNameContext(true);
              }}>Home</Button>
              <Button color='inherit' component={Link} to="/coopLibrary" onClick={() => {
                context.SetNameContext(false);
              }}>Coop Library</Button>
              <Button color='inherit'>Service</Button>
              <Button color='inherit' component={Link} to='/announcements' onClick={() => {
                // context.SetNameContext(false);
              }}>Announcement</Button>
              <Button color='primary'>Contact Us</Button>
              { !!token &&  ( <Button color='primary' onClick={handleLogout}>Logout</Button> )}
            
                
            </Stack>

            
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
