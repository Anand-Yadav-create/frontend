import React, { useState } from 'react';
import './Popover.css'; // Import the CSS file for styling
import Avtar from './shared/Avtar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from "./utils/constant";
import axios from "axios";
import { toast } from 'react-toastify';
import { setUser } from "./redux/authSlice";

const Popover = ({ content }) => {

  const {user}=useSelector(store=>store.auth);

  const [set,sets]=useState(false);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const logoutHandler = async () =>{
    try {
      const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
      if(res.data.success){
        dispatch(setUser(null));
        sets(true);
        navigate("/");
        toast.success(res.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  
  return (
      <>

      {!set&&
        <div  className="popover-content">
          
          <Avtar url= {user?.profile?.profilePhoto} />
          <p>{content}</p>

          {
            user&&user.role==="Student"&&
          <button>
      <Link  to="/profile"><span style={{color:"white"}}>View Profile</span></Link>
      </button>
}
      <button onClick={logoutHandler} style={{marginTop:"5px"}}>
      <span style={{color:"white",marginTop:"5px"}}>Logout</span>
      </button>
  
    
     </div>
      }

     </>
          
           
       
      
      

  );
};

export default Popover;
