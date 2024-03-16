import React, { useState } from "react";

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
  FilledInput,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  all: {
        display: "flex",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",  
  }
})


const SignUp = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box
      className={classes.all} 
    >
      <Box
        sx={{
          width: "30%",
          borderRadius: 5,
          boxShadow: "0.5rem 0.5rem #333",
          padding: "5rem",
          marginX: "auto",
          display: "flex",
          // flexDirection: "column",
          // backgroundColor: "green",
          border: "0.5px solid #000"
        }}
      >
        <Stack
          sx={{
            gap: 1,
            width: "95%",
            // backgroundColor: "gray",
          }}
        >
          <Typography
            textAlign={"center"}
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              backgroundColor: "#78866B",
              borderRadius: 4,
              padding: "0.5rem",
              // marginBottom: "0.1rem"
            }}
          >
            SignUp
          </Typography>
          <TextField required label="First Name" />
          <TextField required label="Last Name" />
          <TextField required type="email" label="Email" />

          <FormControl required variant="contained">
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
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

          <FormControl required variant="contained">
            <InputLabel htmlFor="filled-adornment-password">
              Confirm Password
            </InputLabel>
            <FilledInput
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
          <Stack direction={"row"}>
          <Button
            variant="contained"
            sx={{ alignItems: "center", width: "50%" }}
          >
            SignUp
          </Button>
          <Typography textAlign={"center"}>
            HAVE AN ACCOUNT?
          </Typography>
          </Stack>
        </Stack>
    

      </Box>
    </Box>
  );
};

export default SignUp;
