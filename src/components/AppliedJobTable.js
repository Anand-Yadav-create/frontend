// import React from 'react'
// import "./Table.css";
// import Badge from '@mui/material/Badge';
// import { useSelector } from 'react-redux';



// const AppliedJobTable = () => {

//   const {allAppliedJobs}=useSelector(store=>store.auth);
//   return (
//     <div>
//       <table border="1">
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Job Role</th>
//           <th>Company</th>
//           <th style={{textAlign:"center"}}>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {allAppliedJobs.length<=0?<div style={{textAlign:"center"}}><span>    You are not applied yet</span></div>:allAppliedJobs.map((appliedjobs) => (
//           <tr key={appliedjobs._id}>
//             <td>{appliedjobs.createdAt.split("T")[0]}</td>
//             <td>{appliedjobs.job.title}</td>
//             <td>{appliedjobs.job.company.name}</td>
//             <td style={{textAlign:"center"}}><Badge badgeContent={appliedjobs.status.toUpperCase()} color={`${appliedjobs.status==="rejected"?"error":appliedjobs.status==="pending"?"secondary":"success"}`}></Badge></td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     </div>
//   )
// }

// export default AppliedJobTable
import React from 'react';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import './AppliedJobCard.css'; // CSS for card layout

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.auth);

  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <span>You have not applied yet</span>
      </div>
    );
  }

  return (
    <div className="applied-jobs-container">
      {allAppliedJobs.map((job) => (
        <div className="applied-job-card" key={job._id}>
          <p><strong>Date:</strong> {job.createdAt.split('T')[0]}</p>
          <p><strong>Job Role:</strong> {job.job.title}</p>
          <p><strong>Company:</strong> {job.job.company.name}</p>
          <div className="badge-wrapper">
            <Badge
              badgeContent={job.status.toUpperCase()}
              color={
                job.status === 'rejected'
                  ? 'error'
                  : job.status === 'pending'
                  ? 'secondary'
                  : 'success'
              }

               sx={{
    "& .MuiBadge-badge": {
      right: 8,    // default is 0; increase to move left
      top: -8,
      transform: "none",
      fontSize: "0.75rem",
      padding: "4px 8px"
    }
  }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppliedJobTable;

