import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, Stack, Typography } from '@mui/material';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'category', headerName: 'Category', width: 170 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'invitedBy', headerName: 'Invited By', width: 150 },
  { field: 'size', headerName: 'Size in kb', type: 'number', width: 90 },
  { field: 'createdAt', headerName: 'Uploaded At', width: 150 },
];

export default function BooksTable() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/book/getBooks')
      .then((res) => {
        // console.log(res.data.books);
        setBooks(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  
  const rows = books.map((book, index) => ({
    id: index + 1, // Ensure unique IDs starting from 1
    category: book.category,
    title: book.title,
    author: book.author,
    invitedBy: book.invitedBy || '', // Provide a default value if invitedBy is missing
    size: (book.size)/1000,
    createdAt: book.createdAt.substring(0, 10)
  }));

  return (
    <Stack
        style={{
          height: 400,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
        }}
    >
      <Typography variant='h6'>Books Table</Typography>
        <Card sx={{ width: '65%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Card>
    </Stack>
  );
}
