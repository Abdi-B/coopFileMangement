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

// ICONS
import DehazeIcon from '@mui/icons-material/Dehaze';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles({
  appBar1: {
   
    height: 80,
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
  };

    const classes = useStyles();
  return (
    <AppBar position='fixed' className={classes.appBar1} 
      sx={{backgroundColor: '#6495ED',display: 'flex', justifyContent: "center",  alignItems: ''}}>
        <Toolbar sx={{ backgroundColor: ''}}>
            <IconButton size='large' edge='start' color='inherit' aria-label= 'logo' 
                  sx={{display: {xs: 'none', md: 'flex',  }}}>
                <PeopleIcon/>
            </IconButton>
            <Typography variant='h7' component='div' sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', }}}>COOP Files sharing</Typography>

            {/* <Box  edge='center'  variant="rounded"
                sx={{ width: 150, height: 90, backgroundColor:'white', marginTop: '7px', borderRadius: '5px'}}> */}
                {/* <CatchingPokemon></CatchingPokemon> */}
                {/* <Paper elevation={0} /> */}
                {/* <CardMedia 
                
                  component="img"
                  image={logo}
                  alt="logo"
                />
            </Box> */}

            <Stack direction='row' spacing={2} sx={{display: {xs: 'none', md: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: ''  }}}>
            
              <Button color='primary' component={Link} to="one/Banking%20Operations/One" 
                  onClick={() => {
                  context.SetNameContext(true);  
              }}>Home</Button>
              <Button color='inherit' component={Link} to="/coopLibrary" onClick={() => {
                context.SetNameContext(false);
                // color='primary'
              }}>Coop Library</Button>
              <Button color='inherit'>Service</Button>
              <Button color='inherit' component={Link} to='/announcements' onClick={() => {
                // context.SetNameContext(false);
              }}>Announcement</Button>
              {/* <Button color='primary'>Contact Us</Button> */}
              { !!token && ( <Button color='inherit' component={Link} to='/admin' onClick={() => {
                context.SetNameContext(false);
              }} >Admin</Button>)}
              { !!token &&  ( <Button color='inherit' onClick={handleLogout}>Logout</Button> )}
            
            </Stack>
            <Box sx={{display: {xs: 'flex', md: 'none',  }, justifyContent: '', alignItems: 'center'}}>
              <IconButton size='large' edge='start' color='inherit' aria-label= 'menu'>
                <MenuIcon />
              </IconButton>
              <Typography variant='h7' component='div' sx={{flexGrow: 1, display: {xs: 'flex', md: 'none', }}}>COOP Files sharing</Typography>

            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar




