import React from 'react'

import './Popover.css';
import LatestJobsCard from './LatestJobsCard';
import { useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { motion } from "framer-motion";







const LatestJobs = () => {



  useGetAllJobs();



  const { allJobs } = useSelector(store => store.auth) || { allJobs: [] };







  return (
    <div>
      <h1 style={{ textAlign: "center", font: "bold", marginLeft: "45px" }}> <span style={{ color: "#0a9ecf9a" }}>Latests & Top</span>Job Openings</h1>

      <div style={{ width: "80%", margin: "10px auto", marginBottom: "8rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }} >
        {allJobs?.length > 0 ? (allJobs.slice(0, 6).map((job) => (


          <motion.div
            initial={{ opacity: 0, x: 100 }} // Initial state
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }} // Animation when component mounts
            transition={{ duration: 0.5 }}
            key={job._id}>
            <LatestJobsCard job={job} />

          </motion.div>

        ))) : <span>No JOb Available</span>}
      </div>

    </div>
  )
}

export default LatestJobs
