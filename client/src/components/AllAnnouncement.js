import {React, useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {Box,Card, CardContent,CardMedia, CardActionArea,CardActions, Button,Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import Announcement from './Announcement';
import AppContext from '../context/AppContext';
import { useAuthContext } from '../hooks/useAuthContext';


const useStyles = makeStyles({
     box1: {
        height: '100%',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 110,
        // backgroundColor: 'gray',
    },
    container: {
        width: '80%',
        // backgroundColor: 'red'
    },
    cards: {
        margin: 3,
        
    }
});

export default function AllAnnouncement() {

    const {token} = useAuthContext();
    const context = useContext(AppContext);
    const classes = useStyles()
    const [AllPost, setAllPost] = useState([]);

    useEffect(() => {
        context.SetNameContext(false);
        axios
            .get("http://localhost:3001/read/getPosts", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                // console.log(res.data.allAnnouncement)
            setAllPost(res.data.allAnnouncement);
            })
            .catch((err) => console.log(err));

            
    }, [token]);

    // const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box className={classes.box1}>
        <Container className={classes.container}>

        <Typography variant='h4' >Announcement</Typography>

        {AllPost !== null && AllPost.map((post, index) => (
        <Card key={index} className={classes.cards} elevation={3}>
            <CardContent>
                <Typography gutterBottom variant="p" component="div">
                { post.createdAt && post.createdAt.substring(0, 10)}
                </Typography>
            
                <Typography gutterBottom variant="h6" component="div">
                    {post.title} 
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary" align='justify'>
                    {post.content}
                    

                </Typography>
        </CardContent>
        </Card>
        )
        )}
        </Container>
    </Box>

      
    
  )
}
