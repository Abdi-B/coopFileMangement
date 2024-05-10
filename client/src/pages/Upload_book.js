import FormData from "form-data";
import React, { useState, useEffect,useContext } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    InputLabel,
    FormControl,
    FilledInput,
    InputAdornment,
    IconButton,
    Stack,
    Card,
  } from "@mui/material";
import axios from 'axios';
import AppContext from '../context/AppContext';
import { makeStyles } from '@material-ui/styles';




const useStyles = makeStyles({
    all: {
            display: 'flex',
            boxSizing: 'border-box',
            width: '100%',
            height: '100vh',
            justifyContent: "center",
            alignItems: "center",
        //   backgroundColor: 'green'  
    },
    fileBox: {
        // backgroundColor: 'grey',
        width: '60%',
        boxShadow: '0.3rem 0.3rem 0.6rem grey',
        borderRadius: 5,
        padding: '1rem'
      },
      fileTitle: {
        // backgroundColor: 'grey',
        width: '90%',
        borderRadius: 5,
        padding: '1rem'
      },
      form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    
      }

})

const Upload_book = () => {

    const context = useContext(AppContext);
    const classes = useStyles();

    const [category, setCategory] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('');

    useEffect(() => {
        context.SetNameContext(false);
        // fetchData(); // Fetch data when component mounts
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('category', category);
        formData.append('author', author);
        // console.log(file, title);

        try {
            const response = await axios.post('http://localhost:3001/book/createBook', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    
  return (
    <Box className={classes.all} >
        <Stack gap={2} className={classes.fileBox}>
            <Typography className={classes.fileTitle}>
                    FILE UPLOAD 
            </Typography>

            <form  onSubmit={handleSubmit}>
                <Stack gap={2} className={classes.form}>
                      <TextField required label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                      <TextField required label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                      <TextField required  label="Title" value={title} onChange={(e) => { setTitle(e.target.value) }}/>
                      <TextField required type="file"   onChange={(e) => { setFile(e.target.files[0]) }}/>
                      <Button type="submit"
                        variant="contained"
                        sx={{ alignItems: "center", width: "100%" }}
                        
                      >
                        SignUp
                      </Button>

                </Stack>

            </form>
        </Stack>
    </Box>
  )
}

export default Upload_book;
