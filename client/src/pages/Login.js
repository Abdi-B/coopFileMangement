import React from "react";

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
        <Stack 
        gap={2}
        className={classes.loginBox}
        > 
        <Typography
          className={classes.login1}
          >
            Login
          </Typography>
          <TextField required type="email" label="Email" />
          <FormControl required >
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
          <Box>
          <FormControlLabel
            control={<Checkbox />}
            label="Rememeber me for a month"
          />
        </Box>
        <Button variant="contained"> Login </Button>
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
      </Box>

  );
};

 
export default Login;
