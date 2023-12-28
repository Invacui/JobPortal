import React, { useState,useEffect } from 'react'
import "../../css/dashboard.css"
import india from  "../../asset/india.svg"
import rupee from  "../../asset/rupee.svg"
import emp from  "../../asset/emp.svg"
import { Navigate, useNavigate } from 'react-router-dom'
const Joblist = ({ jobs , isAuthenticated,setisAuthenticated }) => {
    const [jobData, setJobData] = useState([]);
    const [jobsD, setJobs] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setJobs(jobs)
        setIsSearch(jobsD.length > 0);
        console.log('Received jobs:');
        jobs.forEach((job, index) => {
          console.log(`Job ${index + 1}:`, job);
        });
      }, [jobs,isSearch])
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
    function handlejobview(id){
        navigate(`/jobview/:${id}`)
    }
    return (
        <div>
           {(isSearch ? jobs : jobData).length === 0 ? (
                <p>No jobs available.</p>
            ) : (
                (isSearch ? jobs : jobData).slice(0, 3).map((job, index) => (
                    <div key={index} id = "jobrenderbox">

                        <div id="jobrender_b1">
                            <div id="jobrender_b1_s1">
                                <img src="" alt="" id='usericn' />
                            </div>
                            <div id="jobrender_b1_s2">
                                <h2 id="dashjobname">{job.jobPosition}</h2>
                                <div className="jrb1s2">
                                    <img src={emp} alt="rupee_svg"  />&nbsp;
                                    <p>11-50</p>&emsp; 
                                    <img src={rupee} alt="rupee_svg" id='rupeesvg' />&nbsp; 
                                    <p className="salaryandlocation" >{job.monthlySalary}</p>&emsp;
                                    <img src={india} alt="india_svg" /> &nbsp;
                                    <p className="salaryandlocation">{job.location}</p>&emsp;
                                </div>
                                <div className="jrb1s2">
                                    <p className="remoteandfulltime" id="dashro">{job.remoteOrOffice}</p>
                                    <p className="remoteandfulltime">{job.jobType}</p>
                                </div>
                            </div>
                        </div>
                        <div className="jobrender_b2">
                            <div id="jobrender_b2_s1">
                                {job.skills.map((skill , indexone) =>( 
                                    <div id='skillsdash' key={indexone}>{skill}</div>
                                ))}
                            </div>
                            <div id="jobrender_b2_s1">
                                <button type='submit' id='editjobs' >Edit job</button>
                                <button type='submit'id='veiwdetails' onClick={() => handlejobview(job._id)}>View details</button>
                            </div>
                        </div>
                        </div>
                        ))
                    )
                    }
                </div>
            );
        
}

export default Joblist