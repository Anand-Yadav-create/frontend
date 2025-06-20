import React, { useState, useEffect } from "react";



import { useSelector } from "react-redux";


import JobCardList from './JobCardList';

const AdminJobsTable = () => {

  const { allAdminJobs } = useSelector((store) => store.auth || {});
  const { searchJobByText } = useSelector((store) => store.auth);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  
  useEffect(() => {

    const filteredjobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });

    setFilterJobs(filteredjobs);

  }, [allAdminJobs, searchJobByText])

  return (
    <div>
      <h4>A List of your recent posted Jobs</h4>


      <JobCardList filterJobs={filterJobs} />
    </div>
  );
};

export default AdminJobsTable
