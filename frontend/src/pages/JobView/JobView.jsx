import React ,{useState,useEffect}from 'react'
import JobDesc from '../../components/JobView/JobDesc'
import Navbar from '../../components/navBar/Navbar'
const JobView = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        return;
      }
      setIsAuthenticated(false);
  
    },[]);
  return (
    <div className='jobviewmainbody'>
      <Navbar isAuthenticated={isAuthenticated}/>
      <JobDesc isAuthenticated={isAuthenticated}/>
    </div>
  )
}

export default JobView