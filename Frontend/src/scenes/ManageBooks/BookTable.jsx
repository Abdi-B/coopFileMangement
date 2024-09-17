import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import axios from "axios";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useNavigate } from "react-router-dom";

export default function BooksTable() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedBook, setEditedBook] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/book/getBooks")
      .then((res) => {
        setBooks(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  const rows = books.map((book, index) => ({
    id: index + 1, // Ensure unique IDs starting from 1
    category: book.category,
    title: book.title,
    author: book.author,
    sharedBy: book.sharedBy || "", // Provide a default value if sharedBy is missing
    size: book.size / 1000,
    createdAt: book.createdAt.substring(0, 10),
    // ...book, 
  }));

  const handleAddNewBook = () => {
    navigate("/addBook");
  };

  const handleEditClick = (row) => {
    setEditingRow(row.id);
    setEditedBook({ ...row });
  };

  const handleSaveClick = () => {
    if (window.confirm("Are you sure you want to save?")) {
      // Logic to save the editedBook data, e.g., sending it to the server
      console.log("Saved book:", editedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === editedBook.id ? editedBook : book))
      );
      setEditingRow(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "category",
      headerName: "CATEGORY",
      renderCell: (params) =>
        editingRow === params.row.id ? (
          <TextField
            name="category"
            value={editedBook.category}
            onChange={handleInputChange}
          />
        ) : (
          params.row.category
        ),
    },
    {
      field: "title",
      headerName: "TITLE",
      flex: 1,
      renderCell: (params) =>
        editingRow === params.row.id ? (
          <TextField
            name="title"
            value={editedBook.title}
            onChange={handleInputChange}
          />
        ) : (
          params.row.title
        ),
    },
    {
      field: "author",
      headerName: "AUTHOR",
      flex: 1,
      renderCell: (params) =>
        editingRow === params.row.id ? (
          <TextField
            name="author"
            value={editedBook.author}
            onChange={handleInputChange}
          />
        ) : (
          params.row.author
        ),
    },
    {
      field: "sharedBy",
      headerName: "SHARED BY",
      flex: 1,
      renderCell: (params) =>
        editingRow === params.row.id ? (
          <TextField
            name="sharedBy"
            value={editedBook.sharedBy}
            onChange={handleInputChange}
          />
        ) : (
          params.row.sharedBy
        ),
    },
    {
      field: "size",
      headerName: "SIZE in kb",
      type: "number",
      flex: 1,
      renderCell: (params) =>
        editingRow === params.row.id ? (
          <TextField
            name="size"
            value={editedBook.size}
            onChange={handleInputChange}
          />
        ) : (
          params.row.size
        ),
    },
    { field: "createdAt", headerName: "UPLOADED AT", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            {editingRow === params.row.id ? (
              <IconButton onClick={handleSaveClick}>
                <SaveOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleEditClick(params.row)}>
                <EditOutlinedIcon />
              </IconButton>
            )}
            <IconButton>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Header
          title="Books Information"
          subtitle="List of Books for a Reference"
        />
      </Box>
      <Box
        mt="5px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            // borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[600],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: `${colors.blueAccent[700]} !important`,
            borderBottom: "none",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              color: `${colors.grey[100]}`,
            },
          },
        }}
      >
        <Box display="flex" justifyContent="end" m="0 10px 10px 0">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleAddNewBook}
          >
            Add New Book
          </Button>
        </Box>
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
}
