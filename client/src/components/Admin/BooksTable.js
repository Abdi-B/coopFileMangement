import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {  useEffect, useState} from "react";
import { Box, Card, Stack, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'category', headerName: 'Category', width: 170 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'invitedBy', headerName: 'Invited By', width: 150 },
  {
    field: 'size',
    headerName: 'size in kb',
    type: 'number',
    width: 90,
  },

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function BooksTable() {

  const [books, setBooks] = useState([])

  useEffect(() => {
   

  }, [])
  
  return (
    <Stack style={{ height: 400, width: '100%',display: 'flex', justifyContent: 'center',
       alignItems: 'center', backgroundColor: '', margin: 20}}>
        <Typography variant='h6' > Books Table</Typography>
      <Card sx={{width: '65%'}}>
          <DataGrid
          // sx={{backgroundColor: 'green'}}
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
