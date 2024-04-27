import React, { useState,useEffect,useContext, useReducer } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  FormControl,
  FilledInput,
  InputAdornment,
  IconButton,
  Stack,
  Card,
} from "@mui/material";
import axios from 'axios';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { makeStyles } from '@material-ui/styles';
import AppContext from '../context/AppContext';
import { useAuthContext } from './../hooks/useAuthContext';


const useStyles = makeStyles({
  all: {
        display: "flex",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'green'  
  },
  signupBox: {
    // backgroundColor: 'grey',
    width: '60%',
    boxShadow: '0.3rem 0.3rem 0.6rem grey',
    borderRadius: 5,
    padding: '1rem'
  },
  signup1: {
      textAlign: "center",
      fontSize: "2rem",
      fontWeight: "bold",
      backgroundColor: "#78866B",
      borderRadius: 4,
      padding: "0.5rem",
      // marginBottom: "0.1rem"
  },
  form: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column'

  }

});


const SignUp = () => {
  const context = useContext(AppContext);

  const {dispatch} = useAuthContext();


  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  useEffect(() => {
    context.SetNavbar(false);
    context.SetNameContext(false);
}, []);


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( Boolean(firstName) && 
        Boolean(lastName) && 
        Boolean(email) && 
        Boolean(password) && 
        Boolean(confirmPassword) && 
        (password.length > 7) && 
        (password === confirmPassword)  ){
        console.log(firstName,lastName,email, password, confirmPassword, password.length);
      try {
        const response = await axios.post('http://localhost:3001/auth/user', { firstName,lastName,email, password, confirmPassword });
        console.log('New user is created:', response.data);
        
        const token = response.data.token;

        // Store the token in localStorage or sessionStorage
        localStorage.setItem('token', token);

        // update the auth context
        dispatch({type: 'LOGIN', payload: token})


        setfirstName('');
        setlastName('');
        setEmail('');
        setPassword('');
        setconfirmPassword('');
        // You can redirect the user to the newly created post or update the post list
      } catch (error) {
        console.error('Error creating a user:', error.response.data.message);
      }
    }
    else{
      console.log("Error, invalid signup data ")
    }
  };

  
  return (
    <Box
      className={classes.all}
    > 

            <Stack gap={2} className={classes.signupBox}>
              <Typography
                className={classes.signup1}
              >
                SignUp
              </Typography>

              <form onSubmit={handleSubmit} className={classes.form} >
                  <Stack gap={2}>
                      <TextField required label="First Name" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                      <TextField required label="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} />
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

                      <FormControl required >
                        <InputLabel htmlFor="filled-adornment-password">
                          Confirm Password
                        </InputLabel>
                        <FilledInput
                          value={confirmPassword}
                          onChange={(e) => { setconfirmPassword(e.target.value) }}
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
                      <Stack direction={"row"} alignItems={'center'} justifyContent={'space-around'}>
                      <Button type="submit"
                        variant="contained"
                        sx={{ alignItems: "center", width: "50%" }}
                        // onClick={}
                        
                      >
                        SignUp
                      </Button>
                      <Button  onClick={()=>{}}>
                        HAVE AN ACCOUNT?
                      </Button>
                      </Stack>
                  </Stack>
              </form>
              
            </Stack>

    </Box>
  );
};
export default SignUp;
