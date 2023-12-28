import React ,{useEffect} from 'react'
import "../../css/navBar.css"
import userdppic from "../../asset/auth.png"
import { useNavigate } from "react-router-dom";
const Navbar = ({isAuthenticated}) => {
  const navigate = useNavigate();
  useEffect(() => {
    // This will be triggered whenever isAuthenticated prop changes
    console.log("isAuthenticated changed:", isAuthenticated);
  }, [isAuthenticated]);
 

  function handleloginbtn() {
    navigate("/auth/login/")
  }
  function handlesignup() {
    navigate("/auth/signup/")
  }
  return (
    <div className='mainNavbarBody'>
      
      <div className="navButtons">
        <a href="/" id="navLogo">Jobfinder</a>
      </div>
      {isAuthenticated ? (
      <div className="navButtonsone Logged">
        <div className="navLoggedButtons">
            <a id="navLogout" href="/postman">Logout</a>
            <p>Hello! Recruiter</p>
        </div>
      <div className="userdpbox active"><img src={userdppic} alt="userdp" id='userdp ' /></div>
      </div>) : (
      <div className="navButtons" id='Isloggedout'>
        <button className="login_signup_buttons" id="navLogin" onClick={handleloginbtn}>Login</button>
        <button className="login_signup_buttons" id="navSignup" onClick={handlesignup}>Register</button>
      </div>)}
      <div className="navBarbackgroundbox">
          <div className="navrectangles" id='oneBox'>
          </div>
          <div className="navrectangles" id='twoBox'>
          </div>
          <div className="navrectangles" id='threeBox'>
          </div>
      </div>
    </div>
  )
}

export default Navbar