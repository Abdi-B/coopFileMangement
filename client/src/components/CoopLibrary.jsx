import React from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/styles'
import { Box, Stack } from '@mui/material';
import {Card, CardContent,CardMedia, CardActionArea,CardActions, Button,Typography, Container, List, ListItem, ListItemText } from '@mui/material';


const useStyles = makeStyles({
    box1: {
        marginTop: 103,
        // backgroundColor: 'gray',
        height: '100%',
        width: '100%',
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginLeft: -250,
        // marginRight: -250
       
    },
    card1: {
        width: '30%',
        margin: 5,
        backgroundColor: 'gray'
    }
})

const books= [
    {
        title:"aa",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"aa",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"aa",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"aa",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"aa",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
        
    },
]

const CoopLibrary = () => {
    const classes = useStyles();
  return (
    <Stack className={classes.box1} sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
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
                        
                            <Button size="small">download</Button>
                        </CardActions>
                    </Card>
                ))
            }
        
  
    </Stack>
  )
}

export default CoopLibrary;