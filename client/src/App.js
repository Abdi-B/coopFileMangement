import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home  from './components/Home';
import { BrowserRouter as Router,
  Switch,
  Routes ,
  Route,
  Link} from "react-router-dom";
import Create from './pages/Create';
import Layout from './components/Layout';
import DrawerList from './components/DrawerList';
import Note from './pages/Note';
import Department from './pages/Department';
import Announcement from './components/Announcement';
import CreateAnnouncement from './pages/CreateAnnouncement';
import AppContext from './context/AppContext';
import { useState } from 'react';
import AllAnnouncement from './components/AllAnnouncement';
import Login from './pages/Login'
import SignUp from './pages/SignUp';



function App() {

  const [nameContext, SetNameContext] = useState(true);

  return (
    <AppContext.Provider value={{ nameContext, SetNameContext }} >
        
    <Router>
      {/* <Routes> */}
        {/* <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} /> */}


          {/* <Route  element={<Layout />} >
              <Route path="/" element={<Home />} />
              <Route path="/one/:item/:item2" element={<Department />} />

              <Route path="/announcement" element={<CreateAnnouncement />} />
              <Route path='/announcements' element={<AllAnnouncement />} />

          </Route> */}

      {/* </Routes> */}

          <Layout >
             <Routes >

                <Route path="/create" element={<Create />} />
                <Route path="/one/:item/:item2" element={<Department />} />
                <Route path="/announcement" element={<CreateAnnouncement />} />
                <Route path='/announcements' element={<AllAnnouncement />} />
                <Route path='/login' element={<Login />} />
              </Routes>
          </Layout>
          
    </Router>

     </AppContext.Provider>
  )
}

export default App;
