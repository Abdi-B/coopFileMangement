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
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//import components
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box
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
          <Typography
            textAlign={"center"}
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              backgroundColor: "#78866B",
              borderRadius: "0.5rem",
              padding: "0.5rem",
            }}
          >
            SignUp
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
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
      </Box>
    </Box>
  );
};

export default SignUp;
