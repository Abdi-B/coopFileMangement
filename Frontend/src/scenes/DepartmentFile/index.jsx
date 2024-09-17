import {
  Box,
  Button,
  Card,
  Container,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

function DepartmentFile() {
  const { item, item2 } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [file1, setFile1] = useState([]);

  useEffect(() => {
    axios({
      url: `http://localhost:3001/read/${item}/${item2}`,
      method: "get",

      headers: {
        //  'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res.data.file1);
        // Arr = res.data.details
        setFile1(res.data.file1);
        // console.log(file1)
        //  context.SetNameContext(true);
        //  context.SetNavbar(true);
      })
      .catch((err) => console.log(err));
  }, [item2]);

  return (
    <Box mm="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={`${item}`} subtitle={`Welcome to ${item2}`} />
      </Box>
      <Box>
        {file1.map((file, index) => (
          <Box
            key={index}
            sx={{ backgroundColor: "", width: "60%", borderBottom: 1, m: 3 }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemText primary={file} />
              <Button
                sx={{
                  mb: 0.3,
                  color: colors.grey[200],
                  backgroundColor: colors.primary[400],
                  ":hover": {
                    backgroundColor: colors.blueAccent[500],
                  },
                }}
              >
                Download
              </Button>
            </Container>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default DepartmentFile;
