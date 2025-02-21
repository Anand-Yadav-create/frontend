import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import {Link} from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from "react-redux";
import { setLoading,setUser } from "../redux/authSlice";

import { useNavigate } from 'react-router-dom';
import Spinnerbutton from "../spinner/Spinnerbutton";

function Login() {
 
       

       const [formData, setFormData] = useState({
    
    email: "",
    password: "",
    role:"",
  });

  const {user} = useSelector(store=>store.auth);



  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to store submission result
    const [submitted, setSubmitted] = useState(false);

  

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(()=>{
    if(user){
      navigate("/");
    }
  },[])

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    setSubmitted(true);
   
    
    try {

      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`,formData, {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
      });

      if(res.data.success){

        dispatch(setUser(res.data.user));
        
        navigate("/");
        toast.success('🟢 Successfully Login!');
     
      }
      
    } catch (error) {
      console.log(error);
      toast.error('Error fetching data: ' + error.message);
      
    }
    finally{
      dispatch(setLoading(false));
      setSubmitted(false);
    }
  };


  

  return (
    <>
      <Navbar />
      <div style={{ width: "30rem", margin: "auto", padding: "20px 20px",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign:"center"}}>Login</h2>
        <form onSubmit={handleSubmit}>
       
          

          {/* Email Field */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "95%",
                margin:"5px auto",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "95%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>

          

          <div>
            <h3>Select an option:</h3>
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
            <label>
              <input
                type="radio"
                value="Student"
                name="role"
                checked={formData.role === "Student"}
                onChange={handleChange}
              />
              Student
            </label>
            
            <label>
              <input
                type="radio"
                value="Recruiter"
                name="role"
                checked={formData.role === "Recruiter"}
                onChange={handleChange}
              />
              Recruiter
            </label>
            </div>

            
            
          </div>
          <div style={{marginTop:"10px",textAlign:"center"}}>
          
          {
            submitted ?<Spinnerbutton/>
            : <button type="submit">Submit</button>
          }
           </div>
         
          

          {/* Display Submitted Data */}
          <div style={{marginTop:"5px"}}>
          <span>Don't have an account?<Link to="/signup">Sign Up</Link></span>

          </div>
        </form>
        

       
        
      </div>
    
  
      
    </>
  )
}

export default Login
