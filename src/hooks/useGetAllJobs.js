import { useEffect } from 'react'
import axios from 'axios';
import { JOB_API_END_POINT } from '../components/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../components/redux/authSlice';

const useGetAllJobs = () => {

    const dispatch=useDispatch();

    // const {searchingQuery}=useSelector(store=>store.auth);

    useEffect(()=>{
        

        const fetchAlljobs=async ()=>{
        try{
            const res=await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
           
            if(res.data.success){
                
               
                dispatch(setAllJobs(res.data.jobs));
            }
        }catch(error){
            console.log(error);
        }
    }

    fetchAlljobs();

    },[dispatch])
 
}

export default useGetAllJobs;
