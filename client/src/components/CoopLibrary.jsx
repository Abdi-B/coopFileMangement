import React, { useEffect, useContext } from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/styles'
import { Box, Select, Stack } from '@mui/material';
import {Card, CardContent,CardMedia, CardActionArea,CardActions, Button,Typography, Container, List, ListItem, ListItemText , MenuItem} from '@mui/material';
import AppContext from '../context/AppContext';

const useStyles = makeStyles({
    box1: {
        marginTop: 150,
        color: "blue"
        // backgroundColor: 'gray',
        // height: '100%',
        // width: '100%',
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginLeft: -250,
        // marginRight: -250
       
    },
    cardBox:{
            width: '100%',
        marginTop: 5,
        // backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    
    card1: {
        width: '32%',
        margin: 5,
        // backgroundColor: 'green',
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'wrap'
    }
})

const books= [
    {
        title:"Title1",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"Title2",
        category: "Business",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"Title3",
        category: "Psychology",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"Title4",
        category: "Marketing",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"Title5",
        category: "Health",
        author: "Abdi",
        invitedByK:"Chali"
        
        
    },
];


const CoopLibrary = () => {
    const classes = useStyles();
    const context = useContext(AppContext);

    useEffect(() => {
        context.SetNameContext(false);
    
    }, [])
    
  return (
    <Stack  className={classes.box1} sx={{
        display: 'flex', 
        flexDirection: 'column', 
        flexWrap: 'wrap', 
        width: '100vw',
        minWidth: '100vh', 
        height: '100%', 
        backgroundColor: ''}}>
        <Select
        label='Filter By' placeholder='FilterBy' 
        >
                 <MenuItem value="">
                    <em>ALL</em>
                  </MenuItem>

                  {books.map((book, index) => (
                    <MenuItem key={index} value={book.category}>
                    {book.category}
                    </MenuItem>
                    ))}
        </Select >
        <Box  className={classes.cardBox} >
            {
                books.map((book,index)=>(
                    <Card key={index} elevation={3} className={classes.card1} >
            
                        <CardContent>
                            <Typography gutterBottom variant="p" component="div">
                                 Title : {book.title}
                            </Typography>
                        
                            <Typography gutterBottom variant="h7" component="div">
                                Category : {book.category}
                            </Typography>
                            <Typography gutterBottom variant="body2" color="text.secondary" align='justify'>
                                Author : {book.author}   
                            </Typography>
                            <Typography gutterBottom variant="body2" color="text.secondary" align='justify'>
                                invitedBy : {book.invitedByK}
                            </Typography>
                                
                        </CardContent>
                        <CardActions>
                        
                            <Button size="small"  >download</Button>
                        </CardActions>
                    </Card>
                ))
            }
        </Box>
        
        
        
  
    </Stack>
  )
}

export default CoopLibrary;