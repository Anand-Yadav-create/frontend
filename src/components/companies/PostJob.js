import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Spinnerbutton from '../spinner/Spinnerbutton';
import '../Navbar.css';

const PostJob = () => {


    // const companies = ["React", "Vue", "Angular"];
    // const options =["React", "Vue", "Angular"];
    // const companies=[]

    

    const {companies} = useSelector((store)=>store.auth);
    const [selectedOption, setSelectedOption] = useState(companies[0]._id);
    

    // const  companyarray=[];
    const [input,setInput]=useState({
        title:"",
        description:"",
        requirements:"",
        salary:"",
        location:"",
        jobType:"",
        experience:"",
        position:0,
        companyId:""
    });


    useEffect(()=>{
      // setSelectedOption(companies[0]?.name.toLowerCase());
      // const selectedCompany= companies.find((company)=>company.name.toLowerCase()===selectedOption);
      setInput({...input,companyId:selectedOption});
    },[selectedOption]);

    const navigate=useNavigate();

    const [loading,setloading]=useState(false);
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    };

    

    const changeSelectHandler=(e)=>{
      setSelectedOption(e.target.value);
      
    };

    const submitHandler=async (e)=>{
      e.preventDefault();
     
      try{
        setloading(true);
        const res=await axios.post(`${JOB_API_END_POINT}/post`,input,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        });
        if(res.data.success){
          toast.success(res.data.message);
          navigate("/admin/jobs");
        }
      }catch(error){
        toast.error(error.response.data.message);
      }finally{
        setloading(false);
      }
    }

  return (
    <div>
      <Navbar/>
      <div style={{width:"80%",margin:"20px auto"}}>


        <button onClick={()=>navigate("/admin/jobs")} style={{margin:"5px 0px"}}>Back</button>

        <form onSubmit={submitHandler}>

        <div className="bhai" style={{display:"grid"}}>
        <div>
        <h5>Title</h5>
            <input style={{width:"20rem",height:"20px"}} type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler} />
        </div>

        <div>
        <h5>Description</h5>
            <input  style={{width:"20rem",height:"20px",fontSize:"15px"}} type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler} />
        </div>

        <div>
        <h5>Requirements</h5>
            <input style={{width:"20rem",height:"20px",fontSize:"15px"}} type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler} />
        </div>

        <div>
        <h5>Salary</h5>
            <input style={{width:"20rem",height:"20px",fontSize:"15px"}} type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler} />
        </div>

        <div>
        <h5>Location</h5>
            <input style={{width:"20rem",height:"20px",fontSize:"15px"}} type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler} />
        </div>

        <div>
            <h5>JobType</h5>
            <input style={{width:"20rem",height:"20px",fontSize:"15px"}} type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler} />
        </div>

        <div>
            <h5>Experience</h5>
            <input style={{width:"20rem",height:"20px",fontSize:"15px"}} type="text"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler} />
        </div>

        <div>
            <h5>Position</h5>
            <input style={{width:"20rem",height:"20px",fontSize:"15px"}} type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler} />
        </div>
        <div style={{marginTop:"10px"}}>
        {
          companies.length>0&&(

        <select  value={selectedOption} onChange={changeSelectHandler}>


      {companies.map((option) =>{ 
      
      return (
        <option key={option?._id} value={option?._id}>
          {option?.name}
        </option>
      )
}
)}
    </select>
          )
}

</div>
        

        
      </div>

      
      {
            loading ? <Spinnerbutton/>: <button style={{marginTop:"10px"}} type="submit">Post New Job</button>
          }
      {
        companies.length===0 && <p style={{color:"red",fontWeight:"10px"}}>Please Register a company First</p>
      }
      </form>
      </div>
    </div>
  )
}

export default PostJob;
