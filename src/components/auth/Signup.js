import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import {Link} from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import {  useDispatch } from "react-redux";
import { setLoading } from "../redux/authSlice";

import Spinnerbutton from "../spinner/Spinnerbutton";
import '../Navbar.css'
function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber:"",
    password: "",
    role:"",
    file:"",

  });


  const navigate = useNavigate();
  const {loading,user} = useSelector(store=>store.auth);
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

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitted(true);
    const formDat=new FormData();
    formDat.append("fullname",formData.fullname);
    formDat.append("email",formData.email);
    formDat.append("phoneNumber",formData.phoneNumber);
    formDat.append("password",formData.password);
    formDat.append("role",formData.role);
    if(formData.file){
      formDat.append("file",formData.file);
    }

    try {

      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/register`,formData, {
        headers:{
          "Content-Type":"multipart/form-data",
        },
        withCredentials:true,
      });

      if(res.data.success){
        toast.success('🟢 Success Notification!');
        navigate("/login");
      
      }
      
    } catch (error) {
      console.log(error);
      toast.error('Error fetching data: ' + error.message);
      
    } finally{
      dispatch(setLoading(false));
    }
  };


  useEffect(()=>{
    if(user){
      navigate("/");
    }
  },[])

  

  

  const handleImageChange =(e)=>{

    setFormData({...formData,file:e.target.files?.[0]});
    
  }

  return (
    <>
      <Navbar />
      <div  className="temp" style={{ maxWidth: "40%", margin: "20px auto", padding: "20px",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)"  }}>
        <h2 style={{textAlign:"center"}}>Signup</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="username"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Username
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
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


          {/* Submit Button */}
          {/* <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Signup
        </button> */}

        {/* Number Field */}
        <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="phoneNumber"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
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

          <div className="cl" style={{display:"flex", justifyContent:"space-between"}}>
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

            
          

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          </div>
          <div style={{marginTop:"20px",textAlign:"center"}}>
          {

            loading ? <Spinnerbutton/>:<button type="submit">Submit</button>

          }
          </div>
          
          {/* Display Submitted Data */}
          <div style={{marginTop:"20px"}}>
          <span>Already have an account?<Link to="/login">Login</Link></span>

          </div>
        </form>

        

       
      </div>
    </>
  );
}

export default Signup;
