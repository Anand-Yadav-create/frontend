import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import ApplicationTable from './ApplicationTable'
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllapplicants } from '../redux/applicationSlice';

const Applicants = () => {

  const params=useParams();
  const dispatch=useDispatch();

  const {applicants}=useSelector(store=>store.application);
  
  useEffect(()=>{

    const fetchAllApplicants=async()=>{

    
  try {
    const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
    if(res.data.success){

      dispatch(setAllapplicants(res.data.job))

    }
    
  } catch (error) {
    console.log(error);
    
  }
}

fetchAllApplicants();
},[]);
  return (
    <div>

        <Navbar/>
        <div style={{width:"80%",margin:"10px auto"}}>
            <h3>Applicants ({applicants?.applications?.length})</h3>
            <ApplicationTable/>
        </div>
      
    </div>
  )
}

export default Applicants
