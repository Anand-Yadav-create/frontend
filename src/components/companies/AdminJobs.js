import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
// import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
// import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
// import { setsearchCompanyByText } from '../redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setsearchJobByText } from '../redux/authSlice'
import '../Navbar.css'

const AdminJobs = () => {
 
  useGetAllAdminJobs();

  const [input,setInput]=useState("");
  
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(setsearchJobByText(input));

  },[input]);
  return (
    <div>
        <Navbar/>
        <div style={{maxWidth:"80%",margin:"10px auto"}}>
            {/* <div className="cl" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>

                <input style={{width:"20rem",height:"30px",fontSize:"20px"}} placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)}/>

                <button  onClick={()=>navigate("/admin/jobs/create")}>New Jobs</button>


            </div> */}

            <div
  style={{
    display: "flex",
    flexWrap: "wrap", // Enables stacking on smaller screens
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "10px"
  }}
>
  <input
    style={{
      flex: "1 1 250px",       // Grows/shrinks responsively
      maxWidth: "500px",
      height: "36px",
      fontSize: "16px",
      padding: "0 10px",
      boxSizing: "border-box"
    }}
    placeholder="Filter by name"
    onChange={(e) => setInput(e.target.value)}
  />

  <button
    onClick={() => navigate("/admin/jobs/create")}
    style={{
      height: "36px",
      padding: "0 16px",
      fontSize: "16px",
      backgroundColor: "#0a9ecf9a",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      flexShrink: 0             // Prevents button from shrinking too much
    }}
  >
    New Jobs
  </button>
</div>


             <AdminJobsTable/>


        </div>
    </div>
  )
}

export default AdminJobs;
