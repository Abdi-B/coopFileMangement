import { makeStyles,useTheme } from '@material-ui/styles'
import {React, useContext, useState} from 'react'
import { AppBar, Container,Box,Stack,Paper  } from '@mui/material';
import DrawerList from './DrawerList';
import Navbar from './Navbar';
import Announcement from './Announcement';
import CreateAnnouncement from '../pages/CreateAnnouncement';
import AppContext from '../context/AppContext';

const useStyles = makeStyles({
    page: {
        // background: '#E0E1E2',
        // maxWidth: '55%',
        width: '100%',
        // height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    layout: {
      // background: 'green',
      // height: '100%',
      width: '60%',
      display: 'flex',
      flexGrow: 1, 
    }
    
})

function Layout({ children }) { 


  const context = useContext(AppContext);
  console.log("context.navbar value is :" + context.navbar )

   
    const classes = useStyles()
  return (
    <Stack className={classes.page}>
   
         { context.navbar && <Navbar />}
        <Box className={classes.layout}>
        {children}
        </Box>
        { context.nameContext && <DrawerList  /> }
        { context.nameContext && <Announcement  /> }



        
    </Stack>
  )
}

export default Layout