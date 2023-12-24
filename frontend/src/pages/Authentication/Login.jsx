import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import handleFormSubmit from "../../components/form_handler"


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  
  const handleSubmit = (e) => { //Passes the data to handle Submit
    e.preventDefault();
    handleFormSubmit(
      'http://localhost:3001/auth/login',
      'POST',
      formData,
      'Logged In successfully!',
      () => navigate('/jobpost/addJob')
      );
    };
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(`Setting ${name} to: ${value}`);
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handle_SignIn = () =>{
    navigate('/auth/signup')
  }
  return (
    <div className='Signupbody_main'>
      <div className="form_heading_s">
        <h1>Already have an account?</h1>
        <p className='secheading'>Your personal job finder is here</p>
      </div>
      <div className="form_body_l">
        <form onSubmit={handleSubmit}>
          {/* Your form fields go here, for example: */}
          <label>Email:</label><br />
          <input type='email' name='email' value={formData.email} onChange={handleChange} /><br />
          <label>Pass:</label><br />
          <input type='password' name='password' value={formData.password} onChange={handleChange} /><br />
          <br />
          <br />
          {/* Repeat similar fields for other form inputs */}
          <button type='submit'>Sign In</button>
        <p className='secheading'>Don’t have an account?&nbsp; <span onClick={handle_SignIn}><u><b>Sign Up</b></u></span></p>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
 