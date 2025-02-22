import React from 'react'

import './Navbar.css'; 

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import Avtar from './shared/Avtar';

import { useNavigate } from 'react-router-dom';





  

const Job = ({job}) => {

  const navigate=useNavigate();
  // const jobId="sd;lfjslk;kjfkl;ds";
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentTime=new Date();
    const timeDiff=currentTime-createdAt;
    return Math.floor(timeDiff/(1000*24*60*60));
  }

  const [bookmarked, setBookmarked] = useState(false);
  return (
    <div className="p-10 rounded-md shadow-xl bg-white border border-gray-100" style={{padding:"10px" ,boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)"}}>
      <div className="flex items-center justify-between" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <p>{daysAgoFunction(job?.createdAt)===0?"Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>

        <button style={{backgroundColor:"white",color:"gray"}}
      onClick={() => setBookmarked(!bookmarked)}>
      {bookmarked ? <BookmarkCheck className="text-gray-400"/> : <Bookmark />}
      
    </button>

    </div>
    <div className="flex items-center gap-2 my-2" style={{display:"flex"}}>
      
        <Avtar url={job?.company?.logo}/>
      

      <div >
        <h4 style={{margin:"0px",paddingLeft:"6px"}}>{job?.company?.name}</h4>
        <p style={{margin:"0px",paddingLeft:"6px"}}>{job?.location}</p>
      </div>

      </div>

      <div>
        <h4 className="font-bold text-lg my-2">{job?.title}</h4>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      
      <div style={{display:'flex',alignItems:"center",gap:"2px",marginTop:"4px",justifyContent:"space-evenly",padding:"30px"}}>
      
      {/* <Badge badgeContent=
      color="primary">
      
      </Badge> */}
                    <span style={{backgroundColor:"red",border:"2px solid white",borderRadius:"50px",color:"white",padding:"5px"}} >
                  
                    {`${job?.position}Position`}
                </span>
      {/* <Badge badgeContent={`${job?.jobType.replace(" ","")}`} 
      color="secondary">
      
      </Badge>
      <Badge badgeContent={`${job?.salary}LPA`} 
      color="secondary">
      
      </Badge> */}
      

      <span style={{backgroundColor:"red",border:"2px solid white",borderRadius:"30px",color:"white",padding:"5px"}} >
                  
                 {`${job?.jobType.replace(" ","")}`}
              </span>


              <span style={{backgroundColor:"red",border:"2px solid white",borderRadius:"50px",color:"white",padding:"5px"}} >
                  
              {`${job?.salary}LPA`} 
              </span>
    </div>

    <div>

      <button onClick={()=>navigate(`/description/${job?._id}`)}style={{backgroundColor:"gray",color:"white"}}>Details</button>
      <button style={{backgroundColor:"red"}}>Save for Later</button>
    </div>

     
    </div>
  )
}

export default Job
