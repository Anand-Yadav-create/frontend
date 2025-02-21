import React, { useEffect } from 'react'
import axios from 'axios';
import { COMPANY_API_END_POINT} from '../components/utils/constant';
import { useDispatch } from 'react-redux';
// import { setAllJobs } from '../components/redux/authSlice';
import { setSingleCompany } from '../components/redux/companySlice';

const useGetCompanyById = (Companyid) => {

    const dispatch=useDispatch();

    useEffect(()=>{

        const fetchSingleCompany=async ()=>{
        try{
            const res=await axios.get(`${COMPANY_API_END_POINT}/get/${Companyid}`,{withCredentials:true});
            if(res.data.success){
               
                dispatch(setSingleCompany(res.data.company));
            }
        }catch(error){
            console.log(error);
        }
    }

    fetchSingleCompany();

    },[Companyid,dispatch])
 
}

export default useGetCompanyById;
