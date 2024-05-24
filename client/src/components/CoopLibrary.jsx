import React, { useEffect, useContext, useState } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Box, Select, Stack, Card, CardContent, CardActions, Button, Typography, MenuItem, useMediaQuery, useTheme } from '@mui/material';
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
    },
    box2: {
        width: '80%'
    },
    cardBox: {
        width: '100%',
        // marginY: 5,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        // backgroundColor: 'gray'
    },
    card1: {
        margin: 5,
    },
});


const CoopLibrary = () => {
    const classes = useStyles();
    const context = useContext(AppContext);
    const theme = useTheme();
   
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    useEffect(() => {
        context.SetNameContext(false);
        axios
            .get("http://localhost:3001/book/getBooks")
            .then((res) => {
                setBooks(res.data.books);
            })
            .catch((err) => console.log(err));
    }, [context]);

    // Get unique categories
    const uniqueCategories = [...new Set(books.map(book => book.category))];

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };


    return (
        <Box className={classes.box1}>
            <Stack className={classes.box2}>
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
                </Select>
                <Box className={classes.cardBox}>
                    {books.filter(book => selectedCategory === "" || book.category === selectedCategory).map((book, index) => (
                        <Card
                            key={index}
                            elevation={3}
                            className={classes.card1}
                            sx={{
                                width: isMobile ? '100%' : isTablet ? '45%' : '32%',
                            }}
                        >
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
                                    Invited By: {book.invitedByK}
                                </Typography>
                            </CardContent>
                            <CardActions >
                                <Button size="large" sx={{":hover": {
                                backgroundColor: "#6495ED",
                                color: 'whitesmoke'
                            }}}>Download</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Stack>
        </Box>
    );
}

export default CoopLibrary;
