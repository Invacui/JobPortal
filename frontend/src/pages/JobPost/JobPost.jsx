import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import handleFormSubmit from "../../components/form_handler"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobPost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    companyName: '',
    logoUrl: '',
    jobPosition: '',
    monthlySalary: 0,
    jobType: '',
    remoteOrOffice: '',
    location: '',
    jobDescription: '',
    aboutCompany: '',
    skills: [],
    info: '',
  });
  useEffect(() => {
    const checkUserAuthorization = async () => {
      try {
        console.log(`This is My new token :: ${localStorage.getItem('token')}`);
        const response = await fetch('http://localhost:3001/jobpost/addJob/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'jwttoken': localStorage.getItem('token'),
          },
        });

        if (!response.ok) {
          throw new Error('User not authorized');
        }
        setLoading(false);
        // If the user is authorized, continue with the component rendering
      } catch (error) {
        console.error('Authorization check failed:', error.message);
        navigate('/404'); // Redirect to the 404 page if authorization fails
      }
    };

    checkUserAuthorization();
  }, [navigate]);


  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => {
        if (name === 'skills') {
          // Split the input value into an array using ',' as a delimiter
          const skillsArray = value.split(',');
          // Remove any leading or trailing whitespaces from each skill
          const trimmedSkillsArray = skillsArray.map(skill => skill.trim());
          // Update the skills in the form data
          return { ...prevData, [name]: trimmedSkillsArray };
        } else {
          return { ...prevData, [name]: value };
        }
      });
    };
    
    const handleSubmit = (e) => { //Passes the data to handle Submit
      console.log(formData)
      e.preventDefault();
      handleFormSubmit(
        'http://localhost:3001/jobpost/addJob',
        'POST',
        formData,
        'Posted Job successfully!',
        () => navigate('/username/dashboard'),
        true
      );
    };
if (loading) {
        return <p>Loading...</p>; // Show loading message or spinner
      }

  return (
    <div>
      <h2>Job Post Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Company Name:</label><br />
        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} /><br / >

        <label>Logo URL:</label><br />
        <input type="text" name="logoUrl" value={formData.logoUrl} onChange={handleChange} /><br / >

        <label>Job Position:</label><br />
        <input type="text" name="jobPosition" value={formData.jobPosition} onChange={handleChange} /><br / >

        <label>Monthly Salary:</label><br />
        <input type="number" name="monthlySalary" value={formData.monthlySalary} onChange={handleChange} /><br / >

        <label>Job Type:</label><br />
        <select name="jobType" value={formData.jobType} onChange={handleChange}>
          <option value="">Select Job Type</option>
          <option value="part-time">Part-time</option>
          <option value="full-time">Full-time</option>
        </select><br />

        <label>Remote or Office:</label><br />
        <select name="remoteOrOffice" value={formData.remoteOrOffice} onChange={handleChange}>
          <option value="">Select Remote or Office</option>
          <option value="wfh">Work from Home</option>
          <option value="office">Office</option>
        </select><br />

        <label>Location:</label><br />
        <input type="text" name="location" value={formData.location} onChange={handleChange} /><br / >

        <label>Job Description:</label><br />
        <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange}></textarea>
        <br />
        <label>About Company:</label><br />
        <textarea name="aboutCompany" value={formData.aboutCompany} onChange={handleChange}></textarea>
        <br />
        <label>Skills:</label><br />
        <input type="text" name="skills" value={formData.skills.join(',')} onChange={handleChange} /><br / >

        <label>Info:</label><br />
        <textarea name="info" value={formData.info} onChange={handleChange}></textarea>
        <br />
        <button type="submit">Post Job</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default JobPost;
