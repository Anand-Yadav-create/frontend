

import React, { useState } from 'react';
import './Nav.css';
import Popover from './Popover';
import { Link } from "react-router-dom";
import Avtar from './shared/Avtar';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useSelector(store => store.auth);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-text">Engineers Job <span>Portal</span></Link>
        </div>

        <button className="hamburger" onClick={toggleMobileMenu}>☰</button>

        <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          {
            // Recruiter Links
            user && user.role === "Recruiter" ? (
              <>
                <Link to="/admin/companies">Companies</Link>
                <Link to="/admin/jobs">Jobs</Link>
              </>
            ) : user ? (
              // Student Links
              <>
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/browse">Browse</Link>
                <Link to="/external">Online Jobs</Link>
              </>
            ) : (
              // Guest Links
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/external">Online Jobs</Link>
              </>
            )
          }

          {user && (
            <div className="avatar-container" onClick={togglePopover}>
              <Avtar url={user?.profile?.profilePhoto} />
            </div>
          )}
        </div>
      </div>

      {isPopoverOpen && <Popover content={user?.fullname} />}
    </nav>
  );
};
export default Navbar;