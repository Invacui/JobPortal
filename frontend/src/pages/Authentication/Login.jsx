import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../css/login.css"
import userdppic from "../../asset/auth.png"
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
      () => navigate('/dashboard')
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
      <div className="Signupbody_sub">
        <div className="form_heading_s">
          <h1>Already have an account?</h1>
          <br />
          <p className='secheading'>Your personal job finder is here</p>
        </div>
        <br />
        <div className="form_body_l">
          <form onSubmit={handleSubmit} className="form_body_l">
            <br />
            <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder="Email"/><br />
            <br />
            <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder="Password"/><br />
            <br />
            <br />
            <button type='submit'>Sign In</button><br /><br />
          <p className='secheading'>Don’t have an account?&nbsp; <span onClick={handle_SignIn} style={{ fontWeight: '700', color:'black' }}><u><b>Sign Up</b></u></span></p>
          </form>
        </div>
      </div>
      <div  id='Signupbody_subone'>
        
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
 