import React from 'react'
import Navbar from './Navbar';
import Avtar from './shared/Avtar';
import Badge from '@mui/material/Badge';
import AppliedJobTable from './AppliedJobTable';
import { useState } from 'react';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';
import './Navbar.css';
import './UserProfile.css';


let isResume = true;

const Profile = () => {

  useGetAppliedJobs();
  const [open, setOpen] = useState(false);

  const { user } = useSelector(store => store.auth);
  return (
    <div>
      <Navbar />


      <div className="user-profile-container">
  <div className="user-profile-header">
    <div className="user-profile-info">
      <Avtar />
      <div>
        <h4>{user?.fullname}</h4>
        <p>{user?.profile?.bio}</p>
      </div>
    </div>
    <button className="edit-button" onClick={() => setOpen(true)}>Edit</button>
  </div>

  <div className="user-profile-contact">
    <div><span>{user?.email}</span></div>
    <div><span>{user?.phoneNumber}</span></div>
  </div>

  <div>
    <h4>Skills</h4>
    <div className="skills-wrapper">
      <div className="skills-list">
        {user?.profile?.skills.length !== 0 ? (
          user?.profile?.skills.map((item, index) => (
            <span key={index} className="skill-badge">{item}</span>
          ))
        ) : (
          <span>NA</span>
        )}
      </div>
    </div>
  </div>

  <div className="user-profile-resume">
    <label>Resume</label>
    {isResume ? (
      <a target="_blank" href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a>
    ) : (
      <span>NA</span>
    )}
  </div>
</div>

     
     <div style={{width:"80%",margin:"10px auto"}}>
          <h4>All Applied Jobs</h4>

          <AppliedJobTable />
          </div>
    
      <UpdateProfileDialog open={open} setOpen={setOpen} />


    </div>
  )
}

      export default Profile;
