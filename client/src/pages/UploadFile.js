import React, { useState, useRef, useEffect  } from 'react';
import { Stack, FormControl, InputLabel, Select, MenuItem, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

// const books = [
//     { title: "aa", category: "Tech", author: "Abdi", invitedByK: "Chali" },
//     { title: "bb", category: "Tech", author: "Abdi", invitedByK: "Chali" },
//     { title: "cc", category: "Tech", author: "Abdi", invitedByK: "Chali" },
//     { title: "dd", category: "Tech", author: "Abdi", invitedByK: "Chali" },
//     { title: "ee", category: "Tech", author: "Abdi", invitedByK: "Chali" },
// ];

const UploadFile = () => {
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [file, setFile] = useState(null);
  const [customDepartment, setCustomDepartment] = useState('');
  const [customSubDepartment, setCustomSubDepartment] = useState('');
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/read/getAdminFiles')
      .then((res) => {
        console.log("res.data.allFiles " + res.data.allFiles);
        setBooks(res.data.allFiles);
      })
      .catch((err) => console.log(err));
  }, []);

  const fileInputRef = useRef(null);

  const handleChange1 = (event) => {
    setSelectedOption1(event.target.value);
    if (event.target.value !== 'Other') {
      setCustomDepartment('');
    }
  };

  const handleChange2 = (event) => {
    setSelectedOption2(event.target.value);
    if (event.target.value !== 'Other') {
      setCustomSubDepartment('');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const department = selectedOption1 === 'Other' ? customDepartment : selectedOption1;
    const subDepartment = selectedOption2 === 'Other' ? customSubDepartment : selectedOption2;
    console.log('Selected Option:', department, "and", subDepartment, " file is ", file);
    // Add your logic here for handling the selected option

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
    setSelectedOption1('');
    setSelectedOption2('');
    setCustomDepartment('');
    setCustomSubDepartment('');

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
  } catch (error) {
      console.error('Error uploading file:', error.response);
    
  };
};

const selectDepartment = (books, dep, selectedOption, handleChange, customInput, handleCustomInputChange) => (
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
        {books.map((book, index) => (
          <MenuItem key={index} value={book.title}>
            {book.title}
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

  return (
    <Stack gap={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '', marginTop: 10 }}>
       <Typography >
                    UPLOAD A FILE 
            </Typography>
      {selectDepartment(books, 'Department', selectedOption1, handleChange1, customDepartment, (e) => setCustomDepartment(e.target.value))}
      {selectDepartment(books, 'subDepartment', selectedOption2, handleChange2, customSubDepartment, (e) => setCustomSubDepartment(e.target.value))}
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
