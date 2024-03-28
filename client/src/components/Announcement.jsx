import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, CardContent,CardMedia, CardActionArea,CardActions, Button,Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import cboLogo from './../assets/cbo.png'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  announcement: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  card1: {
    minWidth: "25%",
    maxWidth: "26%",
      height: "100%",  
      position: 'fixed',
      // zIndex: 1000 ,  
      right: 20, 
      top: 10,
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      // marginTop: 15,
      // backgroundColor: 'yellow'
  }

})

function Announcement() {
  const [latestPost, setLatestPost] = useState({});
  const classes = useStyles()

  useEffect(() => {

    axios
        .get("http://localhost:3001/read/getPost")
        .then((res) => {
          setLatestPost(res.data.latestPost);
          // console.log(latestPost)
        })
        .catch((err) => console.log(err));
        
}, []);


  return (
    <Container className={classes.announcement} color='primary'>
      <Card elevation={3} className={classes.card1} >
        <Typography gutterBottom variant="h5" component="div">
                Announcement
        </Typography>

        <CardMedia
        component="img"
        
        image= {cboLogo}
        alt="logo"
        sx={{height:100, width:200}}
        />

        
        <CardContent>
          
        <Typography gutterBottom variant="p" component="div">
        {latestPost && latestPost.createdAt && latestPost.createdAt.substring(0, 10)}
          </Typography>
        
           <Typography gutterBottom variant="h6" component="div">
                 {latestPost.title} 
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary" align='justify'>
                 {latestPost.content}
              
          </Typography>
              
        </CardContent>
        <CardActions>
        
            <Button size="small">See More</Button>
        </CardActions>

    </Card>
    </Container>
  )
}

export default Announcement