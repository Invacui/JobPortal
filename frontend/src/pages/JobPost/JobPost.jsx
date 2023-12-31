import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import handleFormSubmit from "../../components/form_handler"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../css/Jobpost.css"

const JobPost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { id } = useParams();
  const initialFormData = {     //reset the form
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
  };
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
  const isFormDataEmpty = Object.values(formData).every(value => value === '' || value === 0 || value.length === 0); //check if the form is empty or not
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
          setIsAuthenticated(false);
        }
        setIsAuthenticated(true);
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
      const skillsArray = value.split(',');
      const trimmedSkillsArray = skillsArray.map(skill => skill.trim());
      return { ...prevData, [name]: trimmedSkillsArray };
    } else {
      return { ...prevData, [name]: value };
    }
  });
};

const isUpdateMode = !!id;

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    // Create an object to store only the fields that have changed
    const updatedFields = {};

    // Iterate over each field in formData
    for (const key in formData) {
      // Check if the field is not empty and is different from the initial value
      if (formData[key] !== initialFormData[key]) {
        updatedFields[key] = formData[key];
      }
    }

    // Make the API call with only the updated fields
    const response = await fetch(`http://localhost:3001/jobpost/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'jwttoken': localStorage.getItem('token'),
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error('Job updation failed');
    }

    const result = await response.json();

    // Handle success
    toast.success(result.Message);

    // Optionally, redirect to another page after successful submission
    navigate('/dashboard');
  } catch (error) {
    console.error('Job updation failed:', error.message);
    toast.error('Job updation failed');
  }
};

    const handleSubmit = (e) => { //Passes the data to handle Submit
      console.log(formData)
      e.preventDefault();
      handleFormSubmit(
        'http://localhost:3001/jobpost/addJob',
        'POST',
        formData,
        'Posted Job successfully!',
        () => navigate('/dashboard'),
        true
      );
    }; 
if (loading) {
        return <p>Loading...</p>; // Show loading message or spinner
      }

  return (
    <div className="jobpost_main_body">
      <span>
        <h1 style={{color:"#FFF"}} dir='rtl'>Recruiter add job details here</h1>
        <h1>Add job description</h1>
      </span>
      <div className="jobpostformdiv">
      <form onSubmit={isUpdateMode ? handleUpdate : handleSubmit} id="jobpostform">

  <table>
    <tbody>
      <tr>
        <td><label htmlFor="companyName">Company Name</label></td>
        <td><input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter your company name here"/></td>
      </tr>
      <tr>
        <td><label htmlFor="logoUrl">Add logo URL</label></td>
        <td><input type="text" id="logoUrl" name="logoUrl" value={formData.logoUrl} onChange={handleChange} placeholder="Enter the link" /></td>
      </tr>
      <tr>
        <td><label htmlFor="jobPosition">Job Position</label></td>
        <td><input type="text" id="jobPositionone" name="jobPosition" value={formData.jobPosition} onChange={handleChange} placeholder="Enter job position"/></td>
      </tr>
      <tr>
        <td><label htmlFor="monthlySalary">Monthly Salary</label></td>
        <td><input type="number" id="monthlySalary" name="monthlySalary" value={formData.monthlySalary} onChange={handleChange} /></td>
      </tr>
      <tr>
        <td><label htmlFor="jobType">Job Type</label></td>
        <td>
          <select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange}>
            <option value="">Select </option>
            <option value="part-time">Part-time</option>
            <option value="full-time">Full-time</option>
          </select>
        </td>
      </tr>
      <tr>
        <td><label htmlFor="remoteOrOffice">Remote / Office</label></td>
        <td>
          <select id="remoteOrOffice" name="remoteOrOffice" value={formData.remoteOrOffice} onChange={handleChange}>
            <option value="">Select</option>
            <option value="wfh">WF</option>
            <option value="office">Office</option>
          </select>
        </td>
      </tr>
      <tr>
        <td><label htmlFor="location">Location</label></td>
        <td><input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Enter the location"/></td>
      </tr>
      <tr className="txtarea">
        <td><label htmlFor="jobDescription">Job Description</label></td>
        <td><textarea id="jobDescription" name="jobDescription" value={formData.jobDescription} onChange={handleChange} placeholder="Type the job description"></textarea></td>
      </tr>
      <tr className="txtarea">
        <td><label htmlFor="aboutCompany">About Company</label></td>
        <td><textarea id="aboutCompany" name="aboutCompany" value={formData.aboutCompany} onChange={handleChange} placeholder="Type about your company"></textarea></td>
      </tr>
      <tr>
        <td><label htmlFor="skills">Skills Required</label></td>
        <td><input type="text" id="skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="Enter the must-have skills" /></td>
      </tr>
      <tr>
        <td><label htmlFor="info">Information</label></td>
        <td><input type="text" id="info" name="info" value={formData.info} onChange={handleChange} placeholder="Enter the additional information"></input></td>
      </tr>
    </tbody>
  </table>

  <div className="buttonscontainer">
          <button type="submit" id="jobpostsubmit" dir='ltr'>{isUpdateMode ? 'Update Job' : '+ Add Job'}</button>&emsp;
          <button type="button" id="jobpostcancel" onClick={() => setFormData(initialFormData)} disabled={isFormDataEmpty}>Cancel</button>
  </div>
</form>

      </div>

      <ToastContainer />
    </div>
  );
};

export default JobPost;
