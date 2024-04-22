import React, { useState, useEffect,useContext } from "react";
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FilledInput,
  InputAdornment,
  IconButton,
  Stack
} from "@mui/material";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { makeStyles } from '@material-ui/styles';
import AppContext from '../context/AppContext';

const useStyles = makeStyles({ 
  all: {
    display: "flex",
    height: "100vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'green'  
},
loginBox: {
  // backgroundColor: 'grey',
  width: '35%',
  boxShadow: '0.3rem 0.3rem 0.6rem grey',
  borderRadius: 5,
  padding: '1rem'
},
login1: {
  textAlign: "center",
  fontSize: '2rem',
  fontWeight: "bold",
  backgroundColor: "#78866B",
  borderRadius: 4,
  padding: "1rem",
  // marginBottom: "0.1rem"
}
});


const Login = () => {
  const context = useContext(AppContext);
  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

//   useEffect(() => {
//     // context.SetNameContext(false);
// }, []);

  const handleLogin = async (e) => { 
    e.preventDefault();

    if( 
        Boolean(email) && 
        Boolean(password) &&
        password.length > 7 ) {
      console.log(email, password)
      try {
        const response = await axios.post('http://localhost:3001/auth/login', {email, password });
        console.log('New user is created:', response.data);
      } catch (error) {
        console.error('Error creating a user:', error);
      }
    }
    else{
      console.log("Error, invalid login data ")
    }
  };


  return (
    <Box
         className={classes.all}
    >
        <Stack 
        gap={2}
        className={classes.loginBox}
        > 
        <form onSubmit={handleLogin}>
            <Stack gap={2}>
                    <Typography
                      className={classes.login1}
                      >
                    Login
                  </Typography>
                  <TextField required type="email" label="Email" value={email} onChange={(e) => { setEmail(e.target.value) }}/>
                  <FormControl required >
                    <InputLabel htmlFor="filled-adornment-password">
                      Password
                    </InputLabel>
                    <FilledInput
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                      id="filled-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Box>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                </Box>
                <Button type="submit" variant="contained" > Login </Button>
                  <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button>Forgot Password</Button>
                  <Button>Don't have an account?</Button>
                </Box>
            </Stack>
        </form>
        </Stack>
      </Box>

  );
};

 
export default Login;
