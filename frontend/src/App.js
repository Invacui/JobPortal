
import { Routes,Route } from 'react-router-dom'; //Include this and Routes inside that Route
import Signup from './pages/Authentication/Signup';
import Login from './pages/Authentication/Login'
import Jobpost from './pages/JobPost/JobPost'
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/navBar/Navbar';
function App() {
  return (
    <Routes>
      <Route exac path="/auth/signup" element={<Signup />}/>
      <Route path ="/auth/login" element={<Login/>} />
      <Route path ="/jobpost/addJob" element={<Jobpost/>} />
      <Route path ="/dashboard" element={<Dashboard />} />
      <Route path ="/" element={<Navbar />} />
    </Routes>
  );
}

export default App;
