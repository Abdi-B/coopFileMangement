import React, { useState } from 'react';
import { Box, Stack, FormControl, InputLabel, Select, MenuItem, Button,TextField } from '@mui/material';

const books= [
    {
        title:"aa",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"bb",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"cc",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"dd",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
    },
    {
        title:"ee",
        category: "Tech",
        author: "Abdi",
        invitedByK:"Chali"
        
        
    },
];



var dep = 'Department';
var subdep = 'subDepartment'

const UploadFile = () => {
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [file, setFile] = useState('');

  const handleChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };


  const handleSubmit = () => {
    console.log('Selected Option:', selectedOption1, "and", selectedOption2, " file is ", file);
    // Add your logic here for handling the selected option
  };

  const selectDepartment = (books, dep) => (

    
        <FormControl  sx={{ m: 1, width: '40%'}}>
        <InputLabel id={`select-label-${dep}`}>Select {dep}</InputLabel>
        
                <Select
                  labelId={`select-label-${dep}`}
                  id={`select-${dep}`}
                  value={dep === 'Department' ? selectedOption1 : selectedOption2}
                  label="Select Option"
                  onChange={dep === 'Department' ? handleChange1 : handleChange2}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {books.map((book, index) => (
                    <MenuItem key={index} value={book.title}>
                    {book.title}
                    </MenuItem>
                ))}
                </Select>
        
      </FormControl>
    
   
  );

  return (
    <Stack gap={2} sx={{marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
      {selectDepartment(books, dep)} 
      {selectDepartment(books, subdep)} 
      <TextField sx={{width: '40%'}} required type="file"  value={file} onChange={(e) => { setFile(e.target.value) }}/>

      <Button sx={{width: '40%'}} variant="contained" onClick={handleSubmit}>Submit</Button>

    </Stack>
  );
};

export default UploadFile;
