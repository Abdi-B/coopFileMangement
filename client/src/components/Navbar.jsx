import {React, useContext, useState } from 'react'
import { AppBar,Toolbar, IconButton,Typography,Stack, Menu, MenuList, MenuItem } from '@mui/material'
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
import CoopLibrary from './CoopLibrary';
import Announcement from './Announcement';

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
  const classes = useStyles();

  const { logout} = useLogout();
  const handleLogout = () => {
    logout()
  };

  // const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null)
  // const openMenu = (event: MouseEvent<HTMLElement>) => {
  //     setAnchorNav(event.currentTarget)
  // }

  // const closeMenu = () => {
  //   setAnchorNav(null)
  // }

  const [anchorNav, setAnchorNav] = useState(null);

  const openMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorNav(null);
  };

  const menuItems = [
    { text: 'Home', path: 'one/Banking%20Operations/One' },
    { text: 'Coop Library', path: '/coopLibrary' },
    { text: 'Service', path: '/service' },
    { text: 'Announcement', path: '/announcements' },
    { text: 'Admin', path: '/admin', auth: true },
    { text: 'Logout', action: handleLogout, auth: true }
  ];
    
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
            <Stack direction='row' spacing={2} sx={{ display: { xs: 'none', md: 'flex', justifyContent: 'center', alignItems: 'center' } }}>
                {menuItems.map((item, index) => {
                  if (item.auth && !token) return null;
                  return (
                    <Button
                      key={index}
                      color='inherit'
                      component={item.path ? Link : 'button'}
                      to={item.path}
                      onClick={item.action || null}
                    >
                      {item.text}
                    </Button>
                  );
                })}
        </Stack>
            
            <Box sx={{display: {xs: 'flex', md: 'none',  }, justifyContent: '', alignItems: 'center'}}>
              <IconButton 
                  onClick={openMenu}
                  size='large' edge='start' color='inherit' aria-label= 'menu'>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorNav}
                open={Boolean(anchorNav)}
                onClose={closeMenu}
                sx={{ display: { xs: 'block', md: 'none' }, backgroundColor: '' , marginTop: 2}}
              >
                {menuItems.map((item, index) => {
                  if (item.auth && !token) return null;
                  return (

                    <MenuItem
                      key={index}
                      component={item.path ? Link : 'button'}
                      to={item.path}
                      onClick={() => {
                        closeMenu();
                        if (item.action) item.action();
                      }}
                      sx={{backgroundColor: '', margin: 1, width: 200,borderRadius: '5px', ":hover": {backgroundColor: '#6495ED', transition: '0.01s', }}}
                    >
                      {item.text}
                    </MenuItem>
                  );
                })}
          </Menu>

            </Box>
            <Typography variant='h7' component='div' sx={{flexGrow: 1, display: {xs: 'flex', md: 'none', }}}>COOP Files sharing</Typography>

        </Toolbar>
    </AppBar>
  )
}

export default Navbar




