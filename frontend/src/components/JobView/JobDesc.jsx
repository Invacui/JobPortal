import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../css/jovView.css"
import note from "../../asset/note.svg"
import cal from "../../asset/cal.svg"
const JobDesc = ({isAuthenticated}) => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const navigate = useNavigate();
  
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
    }, [id,isAuthenticated]);
    function handlejobedit(id){
      navigate(`/jobpost/${id}`)
    }
    return (
      <div>
        {job ? (
          <div className='JobViewBodySubMain'>
            <div className="JobViewBodySub" id="JobViewBodySubone">
              <h4>{job.jobPosition} {job.remoteOrOffice}/{job.jobType} at {job.companyName}</h4>
            </div>
            <div className="JobViewBodySub" id="JobViewBodySubtwo">
              <p>1w ago . {job.jobType} <img src={job.logoUrl} alt="" style={{width:"20px",height:"20px"}}/> {job.companyName}</p>
              <div className="headingviewjob">
                <h1>{job.jobPosition}</h1>
                <button id='veiwdetails'className={isAuthenticated ?"veiwdetails":"veiwdetails hidden"} onClick={() => handlejobedit(job._id)}>Edit job</button>
              </div>
              <h5 style={{color:"red",lineHeight:"0"}}>{job.location} l India</h5>
              <div className="tble">
                <tbody>
                  <tr>
                    <td><img src={note} alt="notesvg"  className='notcalsvg' /> Stipened</td>
                    <td><img src={cal} alt="notesvg" className='notcalsvg'  /> Duration</td>
                  </tr>
                  <tr>
                    <td>&nbsp; Rs {job.monthlySalary}</td>
                    <td>&nbsp;6 Months</td>
                  </tr>
                </tbody>
              </div>
              <div id="aboutCompany">
                <h5>About Company</h5>
                <p style={{textAlign:"justify"}}>{job.aboutCompany}</p>
              </div>
              <div id="aboutjob">
                <h5>About the job/internship</h5>
                <p style={{textAlign:"justify"}}>{job.jobDescription}</p>
              </div>
              <div id="aboutSkills">
                <h5>Skill(s) required</h5>
                {job.skills.map((skill,index) => (
                  <span key={index} id="viewjobskills">{skill}</span>
                ))}
              </div>
              <div id="aboutInfo">
                <h5>Additional Information</h5>
                <p style={{textAlign:"justify"}}>{job.info}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
  


export default JobDesc