import React , { useState, useEffect } from "react";
import Joblist from "../../components/Dashboard/Joblist";
import Searchbox from "../../components/Dashboard/Searchbox";
import Navbar from "../../components/navBar/Navbar";
const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        return;
      }
      setIsAuthenticated(false);

    },[]);
    
  const handleSearch = (searchedJobs) => {
    setJobs(searchedJobs);
    console.log('parent joblist=>',jobs)
  };
  
  return (
    <div className="joblistandsearch_main">
      <div className="joblistnav">
        <Navbar isAuthenticated={isAuthenticated}/>
      </div>
      <div className="joblistandsearch">
        <Searchbox onSearch={handleSearch} isAuthenticated={isAuthenticated} />
        <Joblist jobs={jobs} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </div>
    </div>
  );
};

export default Dashboard;
