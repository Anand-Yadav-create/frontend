import React from 'react'
import Navbar from './Navbar';
import Avtar from './shared/Avtar';

import AppliedJobTable from './AppliedJobTable';
import { useState } from 'react';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';


let isResume=true;

const Profile = () => {
 
  useGetAppliedJobs();
  const [open,setOpen]=useState(false);

  const {user}=useSelector(store=>store.auth);
  return (
    <div>
      <Navbar />

      <div style={{ maxWidth: "80rem", background: "white",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.2)", margin: "5px 100px", padding: "8px" }}>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Avtar />
            <div>

              <h4 style={{ margin: "0px 10px", padding: "0px 0px" }}>{user?.fullname}</h4>
              <p style={{ margin: "0px 10px", padding: "0px 0px" }}>{user?.profile?.bio}</p>
            </div>
          </div>

          <button onClick={()=>setOpen(true)}>Edit</button>

        </div>

        <div style={{ margin: "5px 0px" }}>
          <div>
            <span>{user?.email}</span>
          </div>
          <div>
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h4 style={{margin:"0px"}}>Skills</h4>
          {
            <div style={{ maxWidth: "100%", display: "flex",gap:"10px", padding: "30px", alignItems:"right" }}>{
              user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => {
                return (


                

<span style={{backgroundColor:"red",border:"2px solid white",borderRadius:"30px",color:"white",padding:"5px"}} >
                  
{item.replace(" ","")}
</span>












                  

                )
              }
              ) : <span>NA</span>
            }
            </div>
          }

        </div>

        <div >

          <label style={{fontWeight:"bold",marginRight:"10px"}}>Resume</label>
          
          {

            isResume?<a  target="blank" href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a>:<span>NA</span>
          }
        </div>

       



      </div>

      <div style={{maxWidth:"80rem",margin:"5px 95px"}}>

<h4>All Applied Jobs</h4>

<AppliedJobTable/>
</div>
  <UpdateProfileDialog open={open} setOpen={setOpen}/>


    </div>
  )
};

export default Profile
