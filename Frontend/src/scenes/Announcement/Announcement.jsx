import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { tokens } from "../../theme";
import Header from "../../components/Header";

// CustomCard styled component
const CustomCard = styled(Card)(({ theme }) => ({
  margin: "5px",
  width: "100%",
}));

const CustomBox = styled(Box)(({ theme }) => ({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
}));

export default function Announcement() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [AllPost, setAllPost] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/read/getPosts")
      .then((res) => {
        // console.log(res.data.allAnnouncement);
        setAllPost(res.data.allAnnouncement);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box m="10px" height="auto">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Announcement"
          subtitle="Please follow our Announcement daily"
        />
      </Box>
      <CustomBox>
        {AllPost !== null &&
          AllPost.map((post, index) => (
            <CustomCard key={index} elevation={3}>
              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  {post.createdAt && post.createdAt.substring(0, 10)}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  align="justify"
                >
                  {post.content}
                </Typography>
              </CardContent>
            </CustomCard>
          ))}
      </CustomBox>
    </Box>
  );
}
