import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Filter from './Filter'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { motion } from "framer-motion";
import { setSearchedQuery } from './redux/authSlice';
import './Navbar.css'; 


// const job=[1,4,6,7,8,9,10,11,23,4,5,7];

const Jobs = () => {



  useGetAllJobs();
 
  const dispatch=useDispatch();

  const [show,setShow]=useState(true);

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
  const [gridStyle, setGridStyle] = useState({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // Default 3 columns
    gap: "10px",
  });

  // Step 2: Function to update grid style based on window width
  const updateGridStyle = () => {
    if (window.innerWidth <= 880) {
      setShow(false);
      setGridStyle({
        display: "grid",
        gridTemplateColumns: "1fr", // 1 column for very small screens
        gap: "10px",
      });
    } else if (window.innerWidth <= 1068) {
      setShow(true);
      setGridStyle({
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)", // 2 columns for mobile
        gap: "10px",
      });
    } else {
      setShow(true);
      setGridStyle({
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", // 3 columns for desktop
        gap: "10px",
      });
    }
  };

  useEffect(() => {
    // Initial grid style update when the component mounts
    updateGridStyle();

    // Add event listener for window resize
    window.addEventListener("resize", updateGridStyle);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateGridStyle);
    };
  }, []); // Empty dependency array means th
 
  return (
    <div>
     
       <Navbar/>
       <div style={{marginTop:"5px"}}>

              <div style={{display:"flex",gap:"5px"}}>

               <div className='show' style={{width:"20%",paddingLeft:"20px"}}>{
                show&&<Filter/>
               }
               
               </div>
        
       
              {   
                 filterjobs.length<=0?<span>Job not found</span>:(

                         <div className="flex-1" style={{width:"100%",height:"88vh",overflowY:"auto",padding:"20px 20px"}}>
                          
                           <div  style={gridStyle}>
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
