import React, { useState ,useEffect} from "react";
import "../Table.css";
// import Avtar from "../shared/Avtar";
import * as Popover from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
// import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
    // useGetAll();
    // const { companies } = useSelector((store) => store.auth)||{companies:[]};
    const { allAdminJobs} = useSelector((store) => store.auth || {});
    const {searchJobByText}=useSelector((store)=>store.auth);
  
    const [filterJobs,setFilterJobs]=useState(allAdminJobs);
  
    const navigate=useNavigate();
    useEffect(()=>{
  
      const filteredjobs=allAdminJobs.length>=0&&allAdminJobs.filter((job)=>{
        if(!searchJobByText){
          return true;
        }
        return  job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())||job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
      });
  
      setFilterJobs(filteredjobs);
  
    },[allAdminJobs,searchJobByText])
  
    return (
      <div>
        <h4>A List of your recent posted Jobs</h4>
        <table border="1">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Role</th>
              <th>Date</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterJobs.length <= 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Jobs are Found
                </td>
              </tr>
            ) : (
              filterJobs.map((job) => (
                <tr key={job._id}>
                 
                  <td>{job?.company?.name}</td>
                  <td>{job?.title}</td>
                  <td>{job?.createdAt?.split("T")[0]}</td>
                  <td style={{ textAlign: "center" }}>
                    <Popover.Root>
                      <Popover.Trigger className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Edit
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content
                          className="p-4 bg-white border rounded-lg shadow-lg"
                          style={{
                            padding: "4px",
                            backgroundColor: "white",
                            border: "2px solid black",
                          }}
                        >
                          

                          <div style={{marginTop:"10px",textAlign:"center"}}>

                          <button onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}>Applicants</button>
                          </div>
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

export default AdminJobsTable
