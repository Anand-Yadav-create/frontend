import React from 'react'
import Badge from '@material-ui/core/Badge';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../components/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../components/redux/authSlice';
import { toast } from 'react-toastify';
import Navbar from './Navbar'
import useGetCompanyById from '../hooks/useGetCompanyById';
import Avtar from './shared/Avtar';
import './Navbar.css';
const JobDescription = () => {


    const params = useParams();
    const jobId = params.id;

    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    const { singleJob } = useSelector(store => store.auth);

    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

    const [isApplied, setisApplied] = useState(isIntiallyApplied);



    useEffect(() => {

        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setisApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchSingleJob();

    }, [jobId, dispatch, user?._id]);


    useGetCompanyById(singleJob?.company);

    const { singleCompany } = useSelector(store => store.company);

    const applyJobHandler = async () => {
        if (!user) {
            toast.error("User not Authenticated");
        }
        else {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

                if (res.data.success) {
                    setisApplied(true);
                    const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                    dispatch(setSingleJob(updateSingleJob));
                    toast.success(res.data.message);
                }

            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);

            }
        }

    }

    return (

        <div><Navbar />
            <div style={{ margin: "80px 80px" }}>

                <div className="cl" style={{ display: "flex", justifyContent: "space-between", padding: "10px 10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
                    <div>

                        <Avtar url={singleCompany?.logo} />
                        <h4 style={{ margin: "0px" }}>{singleJob?.title}</h4>
                        <p style={{ marginBottom: "0px", paddingBottom: "0px" }}>{singleJob?.description}</p>
                        <h4 style={{ margin: "10px 0" }}>Required Skills</h4>
                        <div style={{ width: "50rem", display: 'flex', gap: "5rem", padding: "30px" }}>

                            <div style={{ display: 'flex', flexWrap: "wrap", gap: "10px", padding: "30px" }}>



                                {singleJob?.requirements?.map((item, index) => (

                                    <Badge key={index} badgeContent={item.replace(" ", "")}
                                        color="secondary">

                                    </Badge>


                                ))}


                                {/* <Badge badgeContent={`${singleJob?.jobType.replace(" ","")}`}
                                      color="secondary">
      
                                         </Badge>
                                   <Badge badgeContent={`${singleJob?.salary}LPA`}
                                       color="secondary">
      
                                                       </Badge> */}
                            </div>


                            <div style={{ width: "10rem", display: 'flex', justifyContent: "space-between", padding: "30px" }}>

                                <h4 style={{ margin: "0px 0px" }}>Job details</h4>

                                <div style={{ margin: "0px 0px", display: 'flex', flexWrap: 'wrap', justifyContent: "space-between", padding: "30px" }}>


                                    <Badge badgeContent={`${singleJob?.position}Position`}
                                        color="primary">

                                    </Badge>
                                    <Badge badgeContent={`${singleJob?.jobType.replace(" ", "")}`}
                                        color="secondary">

                                    </Badge>
                                    <Badge badgeContent={`${singleJob?.salary}LPA`}
                                        color="secondary">

                                    </Badge>
                                </div>
                            </div>


                            <div>
                                <button style={{ backgroundColor: !isApplied ? "red" : "gray", cursor: isApplied ? "not-allowed" : "pointer" }} onClick={isApplied ? null : applyJobHandler}>{isApplied ? "Already Applied" : "Apply Now"}</button>
                            </div>
                        </div>

                        <h4>Job Description</h4>
                        <div>
                            <h4 style={{ margin: "2px 3px" }}> Role: <span style={{ fontWeight: "normal" }}> {singleJob?.title}</span></h4>
                            <h4 style={{ margin: "2px 3px" }}> Location: <span style={{ fontWeight: "normal" }}>{singleJob?.location}</span></h4>
                            <h4 style={{ margin: "2px 3px" }}> Description: <span style={{ fontWeight: "normal" }}>{singleJob?.description}</span></h4>
                            <h4 style={{ margin: "2px 3px" }}> Experience: <span style={{ fontWeight: "normal" }}>{singleJob?.experienceLevel} yrs</span></h4>
                            <h4 style={{ margin: "2px 3px" }}> Salary: <span style={{ fontWeight: "normal" }}>{singleJob?.salary} LPA</span></h4>
                            <h4 style={{ margin: "2px 3px" }}> Total Applicants: <span style={{ fontWeight: "normal" }}>{singleJob?.applications?.length || 0}</span></h4>
                            <h4 style={{ margin: "2px 3px" }}> Posted Date: <span style={{ fontWeight: "normal" }}>{singleJob?.createdAt?.split("T")[0] || "No date"}</span></h4>
                        </div>
                    </div>
                </div>

                </div>
                </div>
                )
}

                export default JobDescription;
