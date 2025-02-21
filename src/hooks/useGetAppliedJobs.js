import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { APPLICATION_API_END_POINT } from '../components/utils/constant';
import { setAllAppliedJobs } from '../components/redux/authSlice';


const useGetAppliedJobs = () => {
    const dispatch=useDispatch();

    useEffect(()=>{
        const fetchingAppliedJobs=async()=>{
            try{
                const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchingAppliedJobs();
    },[])
 
};

export default useGetAppliedJobs;
