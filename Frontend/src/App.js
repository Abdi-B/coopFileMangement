import React, { useState } from "react";
import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import DepartmentFile from "./scenes/DepartmentFile";
import AddUser from "./scenes/User/AddUser";
import UserTable from "./scenes/User/UserTable";
import BooksTable from "./scenes/ManageBooks/BookTable";
import FileTable from "./scenes/ManageFile/FileTable";
import AddBook from "./scenes/ManageBooks/AddBook";
import CoopLibrary from "./scenes/ManageBooks/CoopLibrary";
import FAQ from "./scenes/faq";
import Calendar from "./scenes/calendar";
import Announcement from "./scenes/Announcement/Announcement";
import Login from "./scenes/User/Login";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [theme, colorMode] = useMode();
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              {token && (
                <div className="sidebar">
                  <Sidebar />
                </div>
              )}
              <div className="content">
                {token && <Topbar />}
                <Routes>
                  {!token ? (
                    <> 
                    
                      <Route path="/login" element={<Login />} />
                      <Route path="*" element={<Navigate to="/login" />} />
                    </>
                  ) : (
                    <>
                      <Route exact path="/" element={<Dashboard />} />
                      <Route path="/file/:item/:item2" element={<DepartmentFile />} />
                      <Route path="/userform" element={<AddUser />} />
                      <Route path="/user" element={<UserTable />} />
                      <Route path="/books" element={<BooksTable />} />
                      <Route path="/addBook" element={<AddBook />} />
                      <Route path="/coopLibrary" element={<CoopLibrary />} />
                      <Route path="/files" element={<FileTable />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/announcement" element={<Announcement />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </>
                  )}
                </Routes>
              </div>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
