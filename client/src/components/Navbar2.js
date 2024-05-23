import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Stack, Drawer, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// ICONS
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles({
  appBar1: {
    height: 80,
  },
  drawerPaper: {
    width: '250px',
  },
});

function Navbar2() {
  const context = useContext(AppContext);
  const { token } = useAuthContext();
  const { logout } = useLogout();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null)

  const handleLogout = () => {
    logout();
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const classes = useStyles();
  const menuItems = [
    { text: 'Home', path: 'one/Banking%20Operations/One' },
    { text: 'Coop Library', path: '/coopLibrary' },
    { text: 'Service', path: '/service' },
    { text: 'Announcement', path: '/announcements' },
    { text: 'Admin', path: '/admin', auth: true },
    { text: 'Logout', action: handleLogout, auth: true }
  ];

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <IconButton onClick={toggleDrawer(false)}>
        <CloseIcon />
      </IconButton>
      <List>
        {menuItems.map((item, index) => {
          if (item.auth && !token) return null;
          return (
            <ListItem button key={index} component={item.path ? Link : 'button'} to={item.path} onClick={item.action || null}>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <AppBar position='fixed' className={classes.appBar1} sx={{ backgroundColor: '#6495ED', display: 'flex', justifyContent: 'center' }}>
      <Toolbar sx={{ backgroundColor: '' }}>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' sx={{ display: { xs: 'none', md: 'flex' } }}>
          <PeopleIcon />
        </IconButton>
        <Typography variant='h7' component='div' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>COOP Files sharing</Typography>

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

        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h7' component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>COOP Files sharing</Typography>
        </Box>
      </Toolbar>
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.drawerPaper }}
      >
        {drawerList()}
      </Drawer>
    </AppBar>
  );
}

export default Navbar2;
