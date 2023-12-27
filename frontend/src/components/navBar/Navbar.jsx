import React from 'react'
import "../../css/navBar.css"
import userdppic from "../../asset/auth.png"
const Navbar = ({isAuthenticated}) => {
  return (
    <div className='mainNavbarBody'>
      
      <div className="navButtons">
        <a href="/" id="navLogo">Jobfinder</a>
      </div>
      {isAuthenticated ? (
      <div className="navButtons" id='Isloggedout'>
        <button className="login_signup_buttons" id="navLogin">Login</button>
        <button className="login_signup_buttons" id="navSignup">Register</button>
      </div>):(
      <div className="navButtonsone Logged">
        <div className="navLoggedButtons">
            <a id="navLogout" href="/postman">Logout</a>
            <p>Hello! Recruiter</p>
        </div>
      <div className="userdpbox active"><img src={userdppic} alt="userdp" id='userdp ' /></div>
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