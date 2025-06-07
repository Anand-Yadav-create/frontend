import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Filter from './Filter'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { motion } from "framer-motion";
import { setSearchedQuery } from './redux/authSlice';


// const job=[1,4,6,7,8,9,10,11,23,4,5,7];

const Jobs = () => {



  useGetAllJobs();
 
  const dispatch=useDispatch();

  const { allJobs,searchedQuery } = useSelector(store => store.auth);

  const [filterjobs,setFilterjobs]=useState(allJobs);

  useEffect(()=>{
    if(searchedQuery){

      const filteredJobs=allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase())||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase())||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })

      setFilterjobs(filteredJobs);

    }else{
      setFilterjobs(allJobs);
    }
     
    

  },[allJobs,searchedQuery,dispatch]);

  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""));
  }

  },[dispatch]);

 
  return (
    <div>
       <Navbar/>
       <div style={{marginTop:"5px"}}>

              <div style={{display:"flex",gap:"5px"}}>

               <div style={{width:"20%",paddingLeft:"20px"}}> <Filter/>
               
               </div>
        
       
              {   
                 filterjobs.length<=0?<span>Job not found</span>:(

                         <div className="flex-1" style={{width:"100%",height:"88vh",overflowY:"auto",padding:"20px 20px"}}>
                           <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}}>
                            {
                              filterjobs.map((item)=>
                                 (
                                  
                                  <motion.div
                                  initial={{ opacity: 0, x: 100 }} // Initial state
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{opacity:0,x:-100}} // Animation when component mounts
                                  transition={{ duration: 0.5 }}
                                  key={item?._id}>
                     
                                <Job job={item}/>
                                </motion.div>
                                 )
                     
                                 )
                                }

                       </div>
                       </div>
            )
        }
        </div>
      
    </div>
    </div>
  )
}

export default Jobs
