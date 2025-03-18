import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { setSearchedQuery, setSearchingQuery } from './redux/authSlice';
import { motion } from "framer-motion";

// const randomJobs=[1,2,3,4,5,6,7];

const Browse = () => {

    useGetAllJobs();
    const dispatch=useDispatch();

    const {allJobs}=useSelector((store)=>store.auth);
    const {searchedQuery}=useSelector(store=>store.auth);

   

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
        // return ()=>{
        //     dispatch(setSearchedQuery(""));
        // }


    
      },[dispatch]);

   
  return (
    <div>
        <Navbar/>

        <div style={{margin:"0px 70px"}}>
            <h4>Search Results({filterjobs.length})</h4>

            <div className="grid-cont" style={{display:"grid",gap:"20px"}}>
                {
                    filterjobs.map((item)=>{
                        return(

                          <motion.div
                                  initial={{ opacity: 0, x: 100 }} // Initial state
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{opacity:0,x:-100}} // Animation when component mounts
                                  transition={{ duration: 0.5 }}
                                  key={item._id}>
                            <Job job={item} />

                            </motion.div>
                        )
                    })
                }
            </div>
        </div>
      
    </div>
  )
}

export default Browse
