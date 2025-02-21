import React,{useEffect, useState} from 'react'
import Navbar from '../Navbar'
import { COMPANY_API_END_POINT } from '../utils/constant';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinnerbutton from '../spinner/Spinnerbutton';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById';


const CompanySetup = () => {

   const navigate=useNavigate();
   const params=useParams();

   useGetCompanyById(params.id);

    const  [input,setInput]=useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:null
    });
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    
    const [loading,setloading]=useState(false);
    const changeFileHandler=(e)=>{
      const file=e.target.files?.[0];
      setInput({...input,file});
    }
   

    const {singleCompany}=useSelector(store=>store.company);


    useEffect(()=>{
      setInput({
         name:singleCompany.name||"",
         description:singleCompany.description||"",
         website:singleCompany.website||"",
         location:singleCompany.location||"",
         file:singleCompany.file||null
      })
    },[singleCompany]);

    const submitHandler=async (e)=>{
      e.preventDefault();
       const formData=new FormData();
       formData.append("name",input.name);
       formData.append("description",input.description);
       formData.append("website",input.website);
       formData.append("location",input.location);
       if(input.file){
         formData.append("file",input.file);
       }

       try {

         setloading(true);

         const res=await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
            headers:{
               'Content-Type':'multipart/form-data'
            },
            withCredentials:true
         });
         if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/companies");
         }
         
       } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
         
       }
       finally{
         setloading(false);
       }
        
    }
  return (
    <div>
       <Navbar/>
       <div style={{maxWidth:"80%",margin:"10px auto"}}>
         <form onSubmit={submitHandler}>
            <div style={{display:"flex",alignItems:"center",gap:"20rem",padding:"8px"}}> 
                <button onClick={()=>navigate("/admin/companies")}>
                    back
                </button>
                <h3>Company Setup</h3>
            </div>
           <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"10px"}}> 

            <div>
            <h4>Company Name</h4>
            <input type="text"
               name="name"
               value={input.name}
               onChange={changeEventHandler}

               style={{width:"20rem",height:"30px"}}

               />
               </div>

               <div>
            <h4>Description</h4>
            <input type="text"
               name="description"
               value={input.description}
               onChange={changeEventHandler}
               style={{width:"20rem",height:"30px"}}

               />
               </div>

               <div>
            <h4>Website</h4>
            <input type="text"
               name="website"
               value={input.website}
               onChange={changeEventHandler}
               style={{width:"20rem",height:"30px"}}

               />
               </div>

               <div>
            <h4>Location</h4>
            <input type="text"
               name="location"
               value={input.location}
               onChange={changeEventHandler}
               style={{width:"20rem",height:"30px"}}

               />
               </div>

               <div>
            <h4>LOGO</h4>
            <input type="file"
               accept="image/*"
              
               onChange={changeFileHandler}
               style={{width:"20rem",height:"30px"}}

               />
               </div>



</div>


{
            loading ? <Spinnerbutton/>: <button type="submit">Submit</button>
          }   

         </form>
       </div>
    </div>
  )
}

export default CompanySetup
