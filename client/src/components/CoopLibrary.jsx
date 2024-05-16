import React, { useEffect, useContext, useState } from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/styles'
import { Box, Select, Stack } from '@mui/material';
import {Card, CardContent,CardMedia, CardActionArea,CardActions, Button,Typography, Container, List, ListItem, ListItemText , MenuItem} from '@mui/material';
import AppContext from '../context/AppContext';
import axios from 'axios';

const useStyles = makeStyles({
    box1: {
        marginTop: 150,
        color: "blue",
        display: 'flex', 
        flexWrap: 'wrap', 
        width: '100vw',
        height: '100%', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '',
       
    },
    box2: {
        width: '80%'
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

// const books= [
//     {
//         title:"Title1",
//         category: "Tech",
//         author: "Abdi",
//         invitedByK:"Chali"
        
//     },
//     {
//         title:"Title2",
//         category: "Business",
//         author: "Abdi",
//         invitedByK:"Chali"
        
//     },
//     {
//         title:"Title3",
//         category: "Psychology",
//         author: "Abdi",
//         invitedByK:"Chali"
        
//     },
//     {
//         title:"Title4",
//         category: "Marketing",
//         author: "Abdi",
//         invitedByK:"Chali"
        
//     },
//     {
//         title:"Title5",
//         category: "Health",
//         author: "Abdi",
//         invitedByK:"Chali"
        
        
//     },
// ];


const CoopLibrary = () => {
    const classes = useStyles();
    const context = useContext(AppContext);

    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    useEffect(() => {
        context.SetNameContext(false);
        axios
            .get("http://localhost:3001/book/getBooks", {
                
            })
            .then((res) => {
                console.log(res.data.books)
            setBooks(res.data.books);
            })
            .catch((err) => console.log(err));

            
    }, []);
    
    // Get unique categories
    const uniqueCategories = [...new Set(books.map(book => book.category))];
    // console.log("uniqueCategories", uniqueCategories)

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    
  return (
    <Box className={classes.box1} >
        <Stack  className={classes.box2} >
        <Select
         label='Filter By'
         placeholder='FilterBy'
         value={selectedCategory}
         onChange={handleCategoryChange}
         displayEmpty
        >
                 <MenuItem value="">
                    <em>ALL</em>
                  </MenuItem>

                  {uniqueCategories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                    {category}
                    </MenuItem>
                    ))}
        </Select >
        <Box  className={classes.cardBox} >
        {books.filter(book => selectedCategory === "" || book.category === selectedCategory).map((book, index) => (
                        <Card key={index} elevation={3} className={classes.card1}>
                            <CardContent>
                                <Typography gutterBottom variant="body1" component="div">
                                    Title: {book.title}
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div">
                                    Category: {book.category}
                                </Typography>
                                <Typography gutterBottom variant="body2" color="text.secondary" align='justify'>
                                    Author: {book.author}
                                </Typography>
                                <Typography gutterBottom variant="body2" color="text.secondary" align='justify'>
                                    Invited By: 
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Download</Button>
                            </CardActions>
                        </Card>
                    ))}
        </Box>
        
        
        
  
    </Stack>
    </Box>
  )
}

export default CoopLibrary;