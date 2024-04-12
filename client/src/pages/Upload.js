import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button,TextField } from '@mui/material';

const Upload = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [file, setFile] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Selected Option:', selectedOption);
    // Add your logic here for handling the selected option
  };

  const selectDepartment = () => (
    <FormControl sx={{ m: 1, minWidth: '40%' }}>
      <InputLabel id="select-label">Select Department</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={selectedOption}
        label="Select Option"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </FormControl>
  );

  return (
    <Box>
      {selectDepartment()} 
      {selectDepartment()} 
      <TextField required type="file"  value={file} onChange={(e) => { setFile(e.target.value) }}/>

    </Box>
  );
};

export default Upload;
