import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Typography, Container } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  box: {
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          width: '100%',
          height: '100vh',
          alignItems: "center",
          marginTop: 50,
        backgroundColor: ''  
  },
  all: {
    width:'60%', 
    backgroundColor: ''
  },
  list: {
    width: '100%',
    backgroundColor: ""
  }

})


const CreateAnnouncement = () => {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/read/posts', { title, content });
      
      console.log('New blog post created:', response.data);
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
    setTitle('');
    setContent('');
  };

  return (
    <Box className={classes.box}>
        <Stack className={classes.all}>
        <Typography variant='h6' sx={{backgroundColor: '', width: '100%'}}>
                    UPLOAD AN ANNOUNCEMENT 
            </Typography>

        <form onSubmit={handleSubmit}  >
          <Stack gap={2} className={classes.list}>
            <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <TextField label="Content" variant="outlined"   multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)}/>
            <Button type="submit" variant="contained" color="primary" >
              Post Your Announcement
            </Button>
          </Stack>
        </form>
        </Stack>
    </Box>
  );
};

export default CreateAnnouncement;
