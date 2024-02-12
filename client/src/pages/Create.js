import React from 'react'
import { Typography, Button, Container } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { makeStyles } from '@material-ui/styles'
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  btn1: {
    fontSize: 30,
    backgroundColor: 'green',
    '&:hover' : {
      backgroundColor: 'blue'
    }
  },
    title: {
      textDecoration: 'underline',
      marginBottom: 20,
      color: 'gray'
    }
  
})

function Create() {
  
  const classes = useStyles()
  const { item } = useParams();

  return (
    <Container>
        <Typography 
          className={classes.title}
          variant="h6" 
          color="secondary"
        >
          Create New Page
      </Typography>
      <Button 
        className={classes.btn1}
        variant='contained' 
        color='secondary' 
        startIcon={<FileDownloadIcon />}
        onClick={() => {
          alert('clicked')
        }}
      >
        Download
      </Button>
      <Button variant="outlined" disabled >Disabled</Button>
         <br />
        {/* ICONS */}

        <FileDownloadIcon fontSize='large'/>

        <div>
          <p> Item: {item}</p>
        </div>

    </Container>
  )
}

export default Create