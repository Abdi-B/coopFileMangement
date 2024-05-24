import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
  Typography,
  Container,
} from '@mui/material';
import cboLogo from './../assets/cbo.png';
import { makeStyles } from '@material-ui/styles';
import { useAuthContext } from '../hooks/useAuthContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  announcement: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card1: {
    minWidth: '25%',
    maxWidth: '26%',
    height: '100%',
    position: 'fixed',
    right: 20,
    top: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Announcement() {
  const { token } = useAuthContext();
  const [latestPost, setLatestPost] = useState({});
  const [showFullContent, setShowFullContent] = useState(false); // Toggle state for full content

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    axios
      .get("http://localhost:3001/read/getPost", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log('Response:', res.data);
        setLatestPost(res.data.latestPost);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <Container className={classes.announcement} sx={{ display: isMobile ? 'none' : 'block' }} color='primary'>
      <Card elevation={3} className={classes.card1}>
        <Typography gutterBottom variant="h5" component="div">
          Announcement
        </Typography>
        <CardMedia
          component="img"
          image={cboLogo}
          alt="logo"
          sx={{ height: 100, width: 200 }}
        />
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
            {latestPost && latestPost.createdAt && latestPost.createdAt.substring(0, 10)}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {latestPost.title}
          </Typography>
          {latestPost.content && (
            <Typography gutterBottom variant="body2" color="text.secondary" align='justify'>
              {showFullContent ? latestPost.content : `${latestPost.content.slice(0, 200)}...`}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {latestPost.content && latestPost.content.length > 200 && (
            <Button size="small" onClick={handleToggleContent}>
              {showFullContent ? 'See Less' : 'See More'}
            </Button>
          )}
        </CardActions>
      </Card>
    </Container>
  );
}

export default Announcement;
