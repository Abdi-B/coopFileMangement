import React, { useState, useRef, useEffect } from 'react';
import { Stack, FormControl, InputLabel, Select, MenuItem, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const UploadFile = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSubDepartment, setSelectedSubDepartment] = useState('');
  const [file, setFile] = useState(null);
  const [customDepartment, setCustomDepartment] = useState('');
  const [customSubDepartment, setCustomSubDepartment] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/read/getAdminFiles')
      .then((res) => {
        console.log("res.data.allFiles", JSON.stringify(res.data.allFiles, null, 2));
        setBooks(res.data.allFiles);
      })
      .catch((err) => console.log(err));
  }, []);

  const fileInputRef = useRef(null);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    if (event.target.value !== 'Other') {
      setCustomDepartment('');
    }
    setSelectedSubDepartment('');  // Reset subDepartment when department changes
  };

  const handleSubDepartmentChange = (event) => {
    setSelectedSubDepartment(event.target.value);
    if (event.target.value !== 'Other') {
      setCustomSubDepartment('');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const department = selectedDepartment === 'Other' ? customDepartment : selectedDepartment;
    const subDepartment = selectedSubDepartment === 'Other' ? customSubDepartment : selectedSubDepartment;
    console.log('Selected Option:', department, "and", subDepartment, " file is ", file);

    

    const formData = new FormData();
    formData.append('file', file);
    formData.append('department', department);
    formData.append('subDepartment', subDepartment);

    try {
      const response = await axios.post(`http://localhost:3001/read/createFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', response.data);
      // Reset the form fields
      setFile(null);
      setSelectedDepartment('');
      setSelectedSubDepartment('');
      setCustomDepartment('');
      setCustomSubDepartment('');

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Error uploading file:', error.response);
    }
  };

  const selectDepartment = (books, dep, selectedOption, handleChange, customInput, handleCustomInputChange) => {
    const depKey = dep === 'Department' ? 'department' : 'subDepartment';
    const uniqueValues = [...new Set(books.map(book => book[depKey]))];

    return (
      <FormControl sx={{ m: 1, width: '60%' }}>
        <InputLabel id={`select-label-${dep}`}>Select {dep}</InputLabel>
        <Select
          labelId={`select-label-${dep}`}
          id={`select-${dep}`}
          value={selectedOption}
          label={`Select ${dep}`}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {uniqueValues.map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
          <MenuItem value="Other">
            <em>Other</em>
          </MenuItem>
        </Select>
        {selectedOption === 'Other' && (
          <TextField
            sx={{ mt: 2 }}
            label={`Enter ${dep}`}
            value={customInput}
            onChange={handleCustomInputChange}
          />
        )}
      </FormControl>
    );
  };

  const selectSubDepartment = (books, selectedDepartment, selectedSubDepartment, handleChange2, customSubDepartment, handleCustomInputChange2) => {
    const filteredBooks = books.filter(book => book.department === selectedDepartment);
    const uniqueSubDepartments = [...new Set(filteredBooks.map(book => book.subDepartment))];

    return (
      <FormControl sx={{ m: 1, width: '60%' }}>
        <InputLabel id="select-label-subDepartment">Select SubDepartment</InputLabel>
        <Select
          labelId="select-label-subDepartment"
          id="select-subDepartment"
          value={selectedSubDepartment}
          label="Select SubDepartment"
          onChange={handleChange2}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {uniqueSubDepartments.map((subDepartment, index) => (
            <MenuItem key={index} value={subDepartment}>
              {subDepartment}
            </MenuItem>
          ))}
          <MenuItem value="Other">
            <em>Other</em>
          </MenuItem>
        </Select>
        {selectedSubDepartment === 'Other' && (
          <TextField
            sx={{ mt: 2 }}
            label="Enter SubDepartment"
            value={customSubDepartment}
            onChange={handleCustomInputChange2}
            // onChange={(e) => setCustomSubDepartment(e.target.value)}
          />
        )}
      </FormControl>
    );
  };

  return (
    <Stack gap={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 10 }}>
      <Typography>
        UPLOAD A FILE 
      </Typography>
      {selectDepartment(books, 'Department', selectedDepartment, handleDepartmentChange, customDepartment, (e) => setCustomDepartment(e.target.value))}

      {selectedDepartment && selectSubDepartment(books, selectedDepartment, selectedSubDepartment, handleSubDepartmentChange, customSubDepartment, (e) => setCustomSubDepartment(e.target.value))}
      <TextField
        sx={{ width: '60%' }}
        required
        type="file"
        inputRef={fileInputRef}
        onChange={handleFileChange}
      />
      <Button sx={{ width: '60%' }} variant="contained" onClick={handleSubmit}>Submit</Button>
    </Stack>
  );
};

export default UploadFile;



