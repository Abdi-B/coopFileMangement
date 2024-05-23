
import { useEffect,useState } from 'react';
import React, { Component } from 'react'
import axios from 'axios';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse,
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon,
    ListItemText,
    Box,
    Typography, 
    Container } from '@mui/material';
import {Card, 
    CardContent,
    CardMedia, 
    CardActionArea,
    CardActions, 
    Button } from '@mui/material';
import { Stack } from '@mui/system';
import cboLogo from './../assets/cbo.png'



function Home()  {

    const [col, setcol] = useState(-1);

    const [file, setFile] = useState([]);
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/read")
            .then((res) => {
                setFile(res.data.files);
            })
            .catch((err) => console.log(err));
    }, []);
    
    const handleClick = (Item, index) => {

        axios({
            url: `http://localhost:3001/read/${Item}`,
            method: "get"
        })
            .then((res) => {
                // console.log(res.data.details)
                // Arr = res.data.details
                setDetail(res.data.details);
                // console.log(detail)
            })
            .catch((err) => console.log(err));


        setcol(col === index ? -1 : index);

    };

    return <Stack direction='row' position='relative' sx={{paddingTop: 17, justifyContent: 'start', width: "100%"}}>
        <Box sx={{ width: "auto",  }}>
                <Typography>Welcome to Our Page</Typography>

                <Stack sx={{ backgroundColor: "#ECF3F5" }}>
                    <List sx={{ flexDirection: 'column',  }}>
                        <ListItem sx={{ direction: 'row', width: "90%", backgroundColor: "black", ml: 2, color: 'white' }}>
                            {/* <ListItemText sx={{ ml: 2 }}>No</ListItemText> */}
                            <ListItemText sx={{ width: "70%", }}>Department</ListItemText>
                        </ListItem>
                        {file.map((Item, index) => (

                            <Box key={index} sx={{ flexDirection: 'column', width: "90%", backgroundColor: "", ml: 2, }}>
                                

                                <ListItemButton sx={{
                                    width: "90%", backgroundColor: "", borderBottom: 1, borderRadius: 5,
                                    fontSize: '1.2rem',
                                    '@media (min-width:600px)': {
                                        fontSize: '1.8rem',
                                    },
                                    "&:hover": {
                                        backgroundColor: '#00A6CA',
                                        color: 'white'
                                    },

                                }} 
                                onClick={(e) => handleClick(Item, index)}

                                >
                                    {/* <ListItemText sx={{ backgroundColor: "" }} primary={index + 1} /> */}
                                    <ListItemText sx={{ width: "90%", backgroundColor: "", }} primary={Item} />

                                    {col === index ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItemButton>
                            </Box>
                        ))}
                    </List>
                </Stack>
        </Box>
        <Card elevation={3} sx={{ maxWidth: "30%", paddingTop: 10, position: 'fixed',zIndex: 1000 , position: 'fixed',  right: 20, display: 'flex',flexDirection: 'column', alignItems: 'center', }}>
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
                
                <Typography gutterBottom variant="h6" component="div">
                        Michu Digital Lending
                </Typography>
                    
                    <Typography variant="body2" color="text.secondary" align='justify'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque maiores corporis 
                        mollitia pariatur animi fugiat! Nemo similique dolore at aperiam. Dignissimos id,
                        soluta deserunt suscipit temporibus assumenda reprehenderit doloremque in veritatis eligendi! 
                        Inventore iure ex fugiat illo in alias enim similique autem corrupti rem, nobis odit officiis quasi delectus tenetur.
                    </Typography>
              </CardContent>
              <CardActions>
                
                <Button size="small">See More</Button>
            </CardActions>
        
         </Card>
         
    </Stack>
  
}

export default Home



