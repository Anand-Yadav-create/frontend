
import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import Popover from './Popover';
import './Popover.css';
import {Link} from "react-router-dom";
import Avtar from './shared/Avtar';
import { useSelector } from 'react-redux';

const Navbar = () => {
  

    

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    
      const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen);
      };

      
      const {user}=useSelector(store=>store.auth);

      
  
  return (
      // <nav>
    
      // <div className="navbar-container">
      //   <div className="navbar-logo">
      //     <a href="/">Job<span>Portal</span></a>
      //   </div>
       
      //   <div className="navbar-user">
      //     <Link to="/profile" className="navbar-profile">
      //       Profile
      //     </Link>
      //     <Link to="#" className="navbar-login">
      //       Login
      //     </Link>
      //   </div>
        
      //   <button
      //   className="popover-trigger"
      //   onClick={togglePopover}
      //   onBlur={closePopover} // Closes popover when clicking outside
      // >
      //   Click Me
      // </button>
      //               {isPopoverOpen && <Popover content={<p>This is the popover content!</p>}/>}
            
        
      // </div>
      // </nav>


     // NavBar.js


     
    <nav className="navbar" >
    <div className="navbar-logo" style={{padding:"20px"}}>
      <Link to="/" style={{color:"#0a9ecf9a"}}>Engineers Job <span>Portal</span></Link>
    </div>
    <div className="navbar-links">
      {
        (user && user.role==="Recruiter")?
        (<><Link to="/admin/companies">Companies</Link>
      <Link to="/admin/jobs">Jobs</Link></>):(<>
       <Link to="/">Home</Link>
      <Link to="/jobs">Jobs</Link>
      <Link to="/browse">Browse</Link></>)
     
}
      
    
    {!user?(<div>
     <Link to="/login"> <button>Login</button></Link>
      <Link to="/signup"> <button>SignUp</button></Link>
    </div>):
    (<div onClick={togglePopover}>
    <Avtar url= {user?.profile?.profilePhoto} />
    </div>
    )
   
     
   
    

    }
    {isPopoverOpen && <Popover content={user?.fullname}/>}
    </div>
    
    
  </nav>

  


   
  );
};

export default Navbar;

