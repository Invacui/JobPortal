import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const JobView = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
  
    useEffect(() => {
      const fetchJobDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3001/jobpost/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch job details');
          }
  
          const data = await response.json();
          setJob(data.job);
        } catch (error) {
          console.error('Error fetching job details:', error);
        }
      };
  
      fetchJobDetails();
    }, [id]);
  
    return (
      <div>
        {job ? (
          <div>
            <h2>{job.jobPosition}</h2>
            <p>Company: {job.companyName}</p>
            <p>Salary: {job.monthlySalary}</p>
            {/* Add more details as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
  


export default JobView