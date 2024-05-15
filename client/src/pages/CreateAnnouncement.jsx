import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  all: {
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          width: '100%',
          height: '100vh',
          // justifyContent: "center",
          alignItems: "center",
        backgroundColor: 'black'  
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
      // You can redirect the user to the newly created post or update the post list
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
    setTitle('');
    setContent('');
  };

  return (
    <Box className={classes.all}>
        <Typography sx={{backgroundColor: 'goldenrod', width: '100%'}}>
                    UPLOAD AN ANNOUNCEMENT 
            </Typography>

        <form onSubmit={handleSubmit}  sx={{width: "95%"}}>
          <Stack gap={2} sx={{width: '100%',  display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "gray"}}>
            <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <TextField label="Content" variant="outlined"  multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)}/>
            <Button type="submit" variant="contained" color="primary" >
              Create Announcement
            </Button>
          </Stack>
        </form>
    </Box>
  );
};

export default CreateAnnouncement;
