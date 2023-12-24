import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create a utility function for form submission
const handleFormSubmit = async (url, method, formData, successMessage, navigate, includeToken = false) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeToken) {
      // Add the token to the headers if includeToken is true
      headers['jwttoken'] = localStorage.getItem('token');
    }

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(formData),
    });
      if (response.ok) {
        const data = await response.json();
        const { jwttokengen } = data;

      // Check if jwttokengen is present before storing in localStorage
      if (jwttokengen) {
        localStorage.setItem('token', jwttokengen);
      }
        toast.success(successMessage, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
  
        // Navigate to the specified route
        if (navigate) {
          navigate();
        }
      } else {
        const data = await response.json();
        console.log(`Error for tostify is : ${data.Message}`)
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

  export default handleFormSubmit;