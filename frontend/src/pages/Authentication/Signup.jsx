import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    cpass: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to: ${value}`);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('http://localhost:3000/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Change the content type to JSON
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('User created successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        const data = await response.json();
        toast.error(data.Message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Internal server error. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className='Signupbody_main'>
      <form onSubmit={handleSubmit}>
        {/* Your form fields go here, for example: */}
        <label>First Name:</label>
        <input type='text' name='fname' value={formData.fname} onChange={handleChange} />
        <label>Lname:</label>
        <input type='text' name='lname' value={formData.lname} onChange={handleChange} />
        <label>Email:</label>
        <input type='email' name='email' value={formData.email} onChange={handleChange} />
        <label>Phone:</label>
        <input type='text' name='phone' value={formData.phone} onChange={handleChange} maxLength='10'/>
        <label>Pass:</label>
        <input type='password' name='password' value={formData.password} onChange={handleChange} />
        <label>Cpass</label>
        <input type='password' name='cpass' value={formData.cpass} onChange={handleChange} />

        {/* Repeat similar fields for other form inputs */}

        <button type='submit'>Signup</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
