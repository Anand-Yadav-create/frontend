import React, { useState ,useEffect} from "react";
import "../Table.css";
// import Avtar from "../shared/Avtar";
import * as Popover from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
// import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useNavigate } from "react-router-dom";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { toast } from "react-toastify";
import axios from "axios";
const statusshortlisted=["Accepted","Rejected"];

const ApplicationTable = () => {
    // useGetAll();
    // const { companies } = useSelector((store) => store.auth)||{companies:[]};
    // const { allAdminJobs} = useSelector((store) => store.auth || {});
    // const {searchJobByText}=useSelector((store)=>store.auth);

    const {applicants}=useSelector(store=>store.application);

    
  
    // const [filterJobs,setFilterJobs]=useState(allAdminJobs);
  
    const navigate=useNavigate();
    // useEffect(()=>{
  
    //   const filteredjobs=allAdminJobs.length>=0&&allAdminJobs.filter((job)=>{
    //     if(!searchJobByText){
    //       return true;
    //     }
    //     return  job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())||job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    //   });
  
    //   setFilterJobs(filteredjobs);
  
    // },[allAdminJobs,searchJobByText])

    const statusHandler=async (status,id)=>{
      try {
        axios.defaults.withCredentials=true;

        const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status});
        if(res.data.success){
          toast.success(res.data.message);
        }
        
      } catch (error) {

        toast.error(error.response.data.message);
        
      }
    }
  
    return (
      <div>
        
        <table border="1">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Resume</th>
              <th>Date</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants?.applications?.length <= 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Jobs are Found
                </td>
              </tr>
            ) : (
              applicants?.applications?.map((job) => (
                <tr key={job._id}>
                 
                  <td>{job?.applicant?.fullname}</td>
                  <td>{job?.applicant?.email}</td>
                  <td>{job?.applicant?.phoneNumber}</td>
                  <td>{ job?.applicant?.profile?.resume?<a href={job?.applicant?.profile?.resume} target="_blank">{job?.applicant?.profile?.resumeOriginalName}</a>:<span>No resume</span>}</td>
                  <td>{job?.applicant?.createdAt.split("T")[0]}</td>
                  <td style={{ textAlign: "center" }}>
                    <Popover.Root>
                      <Popover.Trigger className="px-4 py-2 bg-red-500 text-white rounded-md">
                        Edit
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content
                          className="p-4 bg-white border rounded-lg shadow-lg"
                          style={{
                            padding: "4px",
                            backgroundColor: "white",
                            border: "2px solid black",
                            cursor:"pointer"
                          }}
                        >
                          {/* <button onClick={()=>navigate(`/admin/companies/${job._id}`)}>Edit the Company</button> */}

                          <div style={{marginTop:"10px",textAlign:"center"}}>

                          {/* <button onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}>Applicants</button> */}

                          {
                            statusshortlisted.map((status,index)=>
                            {
                              return(
                                <div onClick={()=>statusHandler(status,job._id)} key={index}>
                                  <button style={{marginBottom:"10px"}}>
                                    {status}
                                  </button>
                                </div>

                              )

                            })
                          }
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

export default ApplicationTable

