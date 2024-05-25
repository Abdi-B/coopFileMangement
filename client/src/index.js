import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider} from "@mui/material";
import {AuthContextProvider} from './context/AuthContext'
// import { AppContextProvider } from './context/AppContext';

// const theme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: "#419BF5"
    },
    secondary: {
      main: "#ECF3F5"
    },
    third: {
      main: "#3D8AC7"
    },
  },
  Typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  }
 }

)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </AuthContextProvider>
    
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
