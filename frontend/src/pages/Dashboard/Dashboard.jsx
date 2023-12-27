import React, { useState,useEffect } from 'react'

const Dashboard = () => {

    const [jobData, setJobData] = useState([]);

    const fetchJobData = async () => {
        try {
            const response = await fetch('http://localhost:3001/username/dashboard/', {
                method: 'GET', // Method type
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Data from server:', data);
            setJobData(data.datajob);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchJobData();
    }, []);

    return (
        <div>
            {jobData.length === 0 ? (
                <p>No jobs available.</p>
            ) : (
                jobData.slice(0, 3).map((job, index) => (
                    <div key={index}>
                        <h2>{job.jobPosition}</h2>
                        <p>{job.remoteOrOffice}</p>
                        <p>{job.jobType}</p>
                        <p>{job.monthlySalary}</p>
                        <p>{job.location}</p>
                        <div className="skillsetbox">
                            {job.skills.map((skill , indexone) =>(
                                <span key={indexone}>{skill}</span>
                            ))}
                        </div>
                        </div>
                        ))
                    )
                    }
                </div>
            );
        };

export default Dashboard


