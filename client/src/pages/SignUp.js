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
<<<<<<< HEAD
  Stack,
=======
>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
<<<<<<< HEAD
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
=======

//import components
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignUp = () => {
>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box
<<<<<<< HEAD
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
=======
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: "auto",
        gap: 6,
      }}
    >
      <Box>
        <Header />
      </Box>
      <Box
        sx={{
          width: "30%",
          // border: "1px solid #fff",
          borderRadius: "2%",
          boxShadow: "0.5rem 0.5rem #333333",
          padding: "5rem",
          // // position: "absolute",
          // // top: "100%",
          // // left: "50%",
          // transform: "translate(-50%, -50%)",
          marginX: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4
          <Typography
            textAlign={"center"}
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              backgroundColor: "#78866B",
<<<<<<< HEAD
              borderRadius: 4,
              padding: "0.5rem",
              // marginBottom: "0.1rem"
=======
              borderRadius: "0.5rem",
              padding: "0.5rem",
>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4
            }}
          >
            SignUp
          </Typography>
<<<<<<< HEAD
=======
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4
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
<<<<<<< HEAD
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
    

=======

          <FormControl required fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select id="demo-simple-select-label" label="Country">
              <MenuItem value={10}>Ethiopia</MenuItem>
              <MenuItem value={20}>Japan</MenuItem>
              <MenuItem value={30}>China</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{}}>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginX: "7rem",
            }}
          >
            <FormLabel id="demo-row-radio-buttons-group-label">
              Account Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              required
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                // gap: 5,
              }}
            >
              <FormControlLabel
                value="Freelancer"
                control={<Radio />}
                label="Freelancer"
              />
              <FormControlLabel
                value="Employer"
                control={<Radio />}
                label="Employer"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{ alignItems: "center", width: "45%" }}
          >
            SignUp
          </Button>
        </Box>
      </Box>
      <Box>
        <Footer />
>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4
      </Box>
    </Box>
  );
};

export default SignUp;
