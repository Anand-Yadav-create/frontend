import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { toast } from "react-toastify";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import "./ApplicantCardList.css";

const statusOptions = ["Accepted", "Rejected"];

const ApplicantCardList = ({ applicants }) => {
  const [localStatus, setLocalStatus] = useState({}); // Local override after update

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      if (res.data.success) {
        toast.success(res.data.message);
        setLocalStatus((prev) => ({ ...prev, [id]: status }));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="applicant-grid">
      {applicants?.applications?.length === 0 ? (
        <div className="no-applicants">No Applications Found</div>
      ) : (
        applicants?.applications?.map((job) => {
          const currentStatus = localStatus[job._id] || job?.status || "Pending";
          const isHandled = currentStatus !== "Pending";

          return (
            <div className="applicant-card" key={job._id}>
              <h3>{job?.applicant?.fullname}</h3>
              <p><strong>Email:</strong> {job?.applicant?.email}</p>
              <p><strong>Phone:</strong> {job?.applicant?.phoneNumber}</p>
              <p>
                <strong>Resume:</strong>{" "}
                {job?.applicant?.profile?.resume ? (
                  <a
                    href={job.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {job.applicant.profile.resumeOriginalName}
                  </a>
                ) : (
                  <span>No Resume</span>
                )}
              </p>
              <p><strong>Applied On:</strong> {job?.applicant?.createdAt.split("T")[0]}</p>

              {isHandled ? (
                <p className="status-msg">Status: {currentStatus}</p>
              ) : (
                <Popover.Root>
                  <Popover.Trigger className="edit-button">Edit</Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content className="popover-content" sideOffset={5}>
                      {statusOptions.map((status, index) => (
                        <button
                          key={index}
                          className="status-btn"
                          onClick={() => statusHandler(status, job._id)}
                        >
                          {status}
                        </button>
                      ))}
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ApplicantCardList;

