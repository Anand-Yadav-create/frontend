import React from 'react'
import "./Table.css";

import { useSelector } from 'react-redux';



const AppliedJobTable = () => {

  const {allAppliedJobs}=useSelector(store=>store.auth);
  return (
    <div>
      <table border="1">
      <thead>
        <tr>
          <th>Date</th>
          <th>Job Role</th>
          <th>Company</th>
          <th style={{textAlign:"center"}}>Status</th>
        </tr>
      </thead>
      <tbody>
        {allAppliedJobs.length<=0?<div style={{textAlign:"center"}}><span>    You are not applied yet</span></div>:allAppliedJobs.map((appliedjobs) => (
          <tr key={appliedjobs._id}>
            <td>{appliedjobs.createdAt.split("T")[0]}</td>
            <td>{appliedjobs.job.title}</td>
            <td>{appliedjobs.job.company.name}</td>
            <td style={{textAlign:"center"}}><span
      style={{
        border: "2px solid white",
        borderRadius: "30px",
        color: "white",
        padding: "5px",
        backgroundColor: appliedjobs.status === "rejected"
          ? "red"
          : appliedjobs.status === "pending"
          ? "gray"
          : "green",
      }}
    >
      {appliedjobs.status.toUpperCase()}
    </span></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
        
    
  )
}

export default AppliedJobTable
