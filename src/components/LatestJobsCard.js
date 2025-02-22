

import React from 'react'
import Avtar from './shared/Avtar';
import { useNavigate } from 'react-router-dom';




const LatestJobsCard = ({job}) => {

  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job?._id}`)} style={{padding:"10px" ,boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)",textAlign:"center"}}>
        <div>
          <Avtar url={job?.company?.logo}/>
        <h3 style={{margin:"0px"}}>{job?.company?.name}</h3>
        <p>{job?.location}</p>
        </div>
        <div>
            <h4  style={{margin:"0px"}}>{job?.title}</h4>
            <p>{job?.description}.</p>
        </div>
        <div>
      
        <div style={{display:'flex',alignItems:"center",gap:"2px",marginTop:"4px",justifyContent:"space-between",padding:"30px"}}>
      
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
        </div>
      
    </div>
  )
}

export default LatestJobsCard
