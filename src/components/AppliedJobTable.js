import React from 'react'
import "./Table.css";
import Badge from '@mui/material/Badge';
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
            <td style={{textAlign:"center"}}><Badge badgeContent={appliedjobs.status.toUpperCase()} color={`${appliedjobs.status==="rejected"?"Secondary":appliedjobs.status==="pending"?"primary":"rgba(235, 19, 19, 0)"}`}></Badge></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default AppliedJobTable
