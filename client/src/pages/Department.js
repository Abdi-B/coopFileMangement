import { Container, ListItemButton, ListItemText, Typography,Box,ListItem, Card, Stack } from '@mui/material';
import {React, useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {ExpandMore, ExpandLess} from '@mui/icons-material';
import axios from 'axios';

const useStyles = makeStyles({
  listPage: {
    // background: 'yellow',
    display: 'flex',
    height: '100%',
    width:'100%',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 115
  },
  list1: {
    display:'flex',
    flexDirection: 'row',
    // background: 'pink',
    width: '70%',
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    margin: 2,
    padding: 1
  },
  lists: {
    // background: 'gray',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    // alignItems: 'center',
    
  },
  
  list2: {
    width: '70%',
    // background: 'purple',
  },
  
  downloadButton: {
    backgroundColor: "gray", 
    borderRadius: 3,
    "&:hover": {
      backgroundColor: 'red',
      color: 'Blue'
      }
  }
})


const Department = () => {

  const [file1, setFile1] = useState([]);
  const [expand, setExpand] = useState(-1);
  const { item, item2 } = useParams();
  const classes = useStyles()

  useEffect(() => {

    axios({
      url: `http://localhost:3001/read/${item}/${item2}`,
      method: "get"
      })
      .then((res) => {
          // console.log(res.data.file1)
          // Arr = res.data.details
          setFile1(res.data.file1);
          // console.log(file1)
      })
      .catch((err) => console.log(err));
}, [item2]);

  return (
    <Stack className={classes.listPage}>
      <Typography variant='h4' >{item}</Typography>
      <Typography variant='h6' >{item2}</Typography>

       {file1.map((Item2, index) => (
        <Card key={index} className={classes.list1} elevation={1}>
          <ListItem className={classes.lists} >
            <ListItemText primary={Item2} className={classes.list2} />
            <ListItemButton className={classes.downloadButton}>Download</ListItemButton>
          </ListItem>
        </Card>
      )
      )} 
    </Stack>
  );
};

export default Department;
