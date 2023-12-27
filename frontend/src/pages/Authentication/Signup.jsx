import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/login.css"

import handleFormSubmit from "../../components/form_handler"

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    cpass: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(
      'http://localhost:3001/auth/signup',
      'POST',
      formData,
      'User created successfully!',
      () => navigate('/username/dashboard')
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to: ${value}`);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handle_SignIn = () => {
    navigate("/auth/login");
  };
  return (
    <div className="Signupbody_main">
       <div className="Signupbody_sub">
      <div className="form_heading_s">
        <h1>Create an account</h1>
        <br />
        <p className="secheading">Your personal job finder is here</p>
      </div>
      <div className="form_body_s">
        <form onSubmit={handleSubmit}>
          {/* Your form fields go here, for example: */}
          <br />
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
          />
          <br />
          <br />
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <br />
          
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <br />
          
          <br />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            placeholder="Phone"
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <br />
          <br />
          <br />
          <input type="radio" name="usertype" id="usertype" />
          <label for="usertype">Are you a Recuriter?</label>
          <br />
          <br />
          <input type="checkbox" name="first_checkbox" id="first_checkbox" />
          <label htmlFor="first_checkbox">
            By creating an account, I agree to our terms of use and privacy
            policy
          </label>
          <br />
          <br />
          {/* Repeat similar fields for other form inputs */}
          <button type="submit">Signup</button>
          <br />
          <br />
          <p className="secheading">
            Already have an account?&nbsp;{" "}
            <span onClick={handle_SignIn}>
              <u>
                <b>Sign In</b>
              </u>
            </span>
          </p>
        </form>
      </div>
      </div>
      <div  id='Signupbody_subone'>
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
