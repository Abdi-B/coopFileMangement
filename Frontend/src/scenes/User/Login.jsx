import React, { useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { AuthContext } from "../../context/AuthContext";


const Login = () => {

  const { setToken } = useContext(AuthContext);
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:3001/auth/login", {
          email,
          password,
        });
        // const data = response.data;

        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);

        navigate("/");
      } catch (error) {
        setError("Invalid email or password. Please try again.");
      }
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      // sx={{ backgroundColor: colors.blueAccent[100] }}
      sx={{ backgroundColor: "whitesmoke" }}
    >
      <Stack
        spacing={3}
        padding={4}
        borderRadius={2}
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        width={{ xs: '90%', sm: '400px' }}
        sx={{ backgroundColor: colors.grey[300] }}
      >
        <Typography variant="h3" align="center" color={colors.primary[800]}>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="filled"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              sx={{ backgroundColor: "grey" }}
            />
            <FormControl variant="filled" fullWidth required>
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // sx={{ backgroundColor: colors.grey[500] }}
                sx={{ backgroundColor: "grey" }}
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
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Stack>
        </form>
        <Box display="flex" justifyContent="space-between">
          <Button component={Link} to="/forgot-password">
            Forgot Password
          </Button>
          <Button component={Link} to="/signup">
            Sign Up
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;
