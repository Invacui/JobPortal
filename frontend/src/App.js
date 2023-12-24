
import { Routes,Route } from 'react-router-dom'; //Include this and Routes inside that Route
import Signup from './pages/Authentication/Signup';
import Login from './pages/Authentication/Login'
import Jobpost from './pages/JobPost/JobPost'
function App() {
  return (
    <Routes>
      <Route exac path="/auth/signup" element={<Signup />}/>
      <Route path ="/auth/login" element={<Login/>} />
      <Route path ="/jobpost/addJob" element={<Jobpost/>} />
    </Routes>
  );
}

export default App;
