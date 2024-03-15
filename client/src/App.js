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
// import { GlobalStateProvider } from './components/GlobalStateContext';
import AppContext from './context/AppContext';
import { useState } from 'react';
import AllAnnouncement from './components/AllAnnouncement';




function App() {

  const [nameContext, SetNameContext] = useState(true);

  return (
    <AppContext.Provider value={{ nameContext, SetNameContext }} >
     {/* <div className='App' >  */}
        
    <Router>

          <Layout >
            <Routes >
              {/* <Route exact path="/" element={<DrawerList /> } /> */}

              <Route path="/create" element={<Create />} />
              <Route path="/one/:item/:item2" element={<Department />} />
              
              <Route path='/announcements' element={<AllAnnouncement />} />
              <Route path="/announcement" element={<CreateAnnouncement />} />
  
            </Routes>
          </Layout>
      
    </Router>
    {/* </div> */}
    


     </AppContext.Provider>
  )
}

export default App;
