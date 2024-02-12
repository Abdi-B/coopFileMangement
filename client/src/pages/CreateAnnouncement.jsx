import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import Announcement from '../components/Announcement';

const CreateAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(title, content)

    // Send a POST request to create a new blog post
    try {
      const response = await axios.post('http://localhost:3001/read/posts', { title, content });
      console.log('New blog post created:', response.data);
      // You can redirect the user to the newly created post or update the post list
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}  sx={{width: '100vh', height: '100vh', display: 'flex', justifyContent: 'center'}}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create Announcement
      </Button>
    </form>
  );
};

export default CreateAnnouncement;
