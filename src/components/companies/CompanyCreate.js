import React,{useState} from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '../utils/constant';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../redux/companySlice';
const CompanyCreate = () => {
    const navigate=useNavigate();
    const [companyName,setcompanyName]=useState();
    const dispatch=useDispatch();

    const registerNewCompany=async ()=>{
        try{
            const res=await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true,
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId=res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }

        }catch(error){
            toast.error(error.response.data.message);
            console.log(error);

        }
    }

    


  return (
    <div>
       <Navbar/>
       <div style={{maxWidth:"80%",margin:"10px auto"}}>
        <h3>Your Company Name</h3>
        <p> What would you like to give your company name? you can change this later.</p>

        <h4>Company name</h4>
        <input type="text"
           placeholder='Microsoft etc'
           style={{margin:"5px auto",width:"80%",height:"30px" ,fontSize:"20px"}}
           onChange={(e)=>setcompanyName(e.target.value)}
           />

           <div style={{display:"flex",marginTop:"10px",gap:"10px"}}>
            <button onClick={()=>navigate("/admin/companies")}>Cancel</button>
            <button onClick={registerNewCompany}>Continue</button>
           </div>
       </div>
      
    </div>
  )
}

export default CompanyCreate
