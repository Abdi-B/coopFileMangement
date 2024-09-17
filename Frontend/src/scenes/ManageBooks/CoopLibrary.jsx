import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { tokens } from "../../theme";

const CoopLibrary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/book/getBooks")
      .then((res) => {
        console.log(res.data.books);
        setBooks(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  // Get unique categories
  const uniqueCategories = [...new Set(books.map((book) => book.category))];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CoopLibrary" subtitle="Welcome to our CoopLibrary" />
      </Box>
      <Box m="10px" height="auto">
        <Select
          label="Filter By"
          placeholder="FilterBy"
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          sx={{ width: "300px" }}
          // backgroundColor={colors.grey[700]}
        >
          <MenuItem value="">
            <em>ALL</em>
          </MenuItem>
          {uniqueCategories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <Box
          sx={{
            width: "100%",
            margin: "2px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "space-between",
            // backgroundColor: 'gray'
          }}
        >
          {books
            .filter(
              (book) =>
                selectedCategory === "" || book.category === selectedCategory
            )
            .map((book, index) => (
              <Card
                key={index}
                elevation={4}
                className=""
                sx={{
                  width: isMobile ? "100%" : isTablet ? "45%" : "32%",
                  m: "5px ",
                  backgroundColor: colors.primary[900],
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div">
                    Title: {book.title}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    Category: {book.category}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    align="justify"
                  >
                    Author: {book.author}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    align="justify"
                  >
                    SharedBy : {book.sharedBy}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="large"
                    sx={{
                      backgroundColor: colors.blueAccent[200],
                      color: "whitesmoke",
                      ":hover": {
                        backgroundColor: "#6495ED",
                      },
                    }}
                  >
                    Download
                  </Button>
                </CardActions>
              </Card>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CoopLibrary;
