import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { useNavigate } from "react-router-dom";
import "./JobCardList.css";

const JobCardList = ({ filterJobs }) => {
  const navigate = useNavigate();

  return (
    <div className="job-grid">
      {filterJobs.length === 0 ? (
        <div className="no-jobs">No Jobs are Found</div>
      ) : (
        filterJobs.map((job) => (
          <div className="job-card" key={job._id}>
            <h3>{job?.company?.name}</h3>
            <p><strong>Role:</strong> {job?.title}</p>
            <p><strong>Date:</strong> {job?.createdAt?.split("T")[0]}</p>

          

                  <button
  className="edit-button"
  onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
>
  Edit
</button>
                
          </div>
        ))
      )}
    </div>
  );
};

export default JobCardList;
