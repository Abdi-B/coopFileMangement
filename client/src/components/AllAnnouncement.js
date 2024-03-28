import {React, useState, useEffect} from 'react'
import axios from 'axios';
import {Card, CardContent,CardMedia, CardActionArea,CardActions, Button,Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import Announcement from './Announcement';

const useStyles = makeStyles({
     container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // textAlign: 'center',
        marginTop: 105,
        // backgroundColor: 'gray',
    },
    cards: {
        margin: 3
    }
})

export default function AllAnnouncement() {
    const classes = useStyles()
    const [AllPost, setAllPost] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:3001/read/getPosts")
            .then((res) => {
                // console.log(res.data.allAnnouncement)
            setAllPost(res.data.allAnnouncement);
            })
            .catch((err) => console.log(err));
            
    }, []);

  return (
    <Container className={classes.container}>

        <Typography >Announcement</Typography>
        
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

      
    
  )
}
