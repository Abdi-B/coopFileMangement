import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home  from './components/Home';
// import { BrowserRouter as Router,
//   Switch,
//   Routes ,
//   Route,
//   Redirect,
//   Link} from "react-router-dom";

  import { BrowserRouter as Router, Switch,Routes, Route, Redirect, Link, Navigate  } from 'react-router-dom';

  // import { useNavigate } from 'react-router-dom';

import Create from './pages/Create';
import Layout from './components/Layout';
import DrawerList from './components/DrawerList';
import Note from './pages/Note';
import Department from './pages/Department';
import Announcement from './components/Announcement';
import CreateAnnouncement from './pages/CreateAnnouncement';
import AppContext from './context/AppContext';
import { useEffect, useState } from 'react';
import AllAnnouncement from './components/AllAnnouncement';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import CoopLibrary from './components/CoopLibrary';
import Upload from './pages/Upload';
import {AuthContextProvider} from './context/AuthContext'
import { useAuthContext } from './hooks/useAuthContext';




function App() {
  // const navigate = useNavigate();

  const {token } = useAuthContext();
  // console.log('token', token)


  const isAuthenticated = !!localStorage.getItem('token');
  // const isAuthenticated = false;

  const [nameContext, SetNameContext] = useState(true);
  const [navbar, SetNavbar] = useState(true);

  return (
 
          <AppContext.Provider value={{ nameContext, SetNameContext, navbar, SetNavbar }} >
        
        <Router>
    
              <Layout >
                 <Routes >
                    {/* <Route path="/" element={<Home />} /> */}
                    
                    {/* { token !== null && token ? ( */}
                    { !!token && (
            <>
              <Route exact path="/one/:item/:item2" element={<Department />} />
              <Route path="/coopLibrary" element={<CoopLibrary />} />
              <Route path="/create" element={<Create />} />
              <Route path="/announcement" element={<CreateAnnouncement />} />
              <Route path="/announcements" element={<AllAnnouncement />} />
            </>
                  ) }
              <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
                  </>
                 
                    <Route path='/upload' element={<Upload />} /> 

                    {/* <Route path="/signup">
                    {isAuthenticated ? <Redirect to="/login"/> : <Redirect to="/signup" />}
                   </Route> */}
                   {/* <Route path="/signup" element={<Navigate replace to="/home" /> } /> */}

                   {/* <Route path="/signup">
                   {isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/signup" />}
                   </Route> */}

                  {/* {isAuthenticated ? navigate('/login') : navigate('/signup')} */}
                    
                  </Routes>
              </Layout>
              
        </Router>
    
         </AppContext.Provider>
   


  )
}

export default App;
