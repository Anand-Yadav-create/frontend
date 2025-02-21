import React, { useEffect } from 'react'
import axios from 'axios';
import { JOB_API_END_POINT } from '../components/utils/constant';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs } from '../components/redux/authSlice';
// import { setAllJobs } from '../components/redux/authSlice';

const useGetAllAdminJobs = () => {

    const dispatch=useDispatch();

    useEffect(()=>{

        const fetchAlladminjobs=async ()=>{
        try{
            const res=await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
            if(res.data.success){
                
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        }catch(error){
            console.log(error);
        }
    }

    fetchAlladminjobs();

    },[dispatch])
 
}

export default useGetAllAdminJobs