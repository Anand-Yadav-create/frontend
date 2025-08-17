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
import '../Navbar.css';



import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase"; // your Firebase config
// import axios from "axios";

// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "./firebase"; // your Firebase config



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








//     const handleGoogleLogin = async () => {
//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const idToken = await result.user.getIdToken();

//     const res = await axios.post("https://engineers-hub-1.onrender.com/google", { token: idToken }, {

//       headers:{
//           "Content-Type":"application/json"
//         },
//       withCredentials: true,
//     });

//     // now you can use res.data.user
//     // setUser(res.data.user); // or redirect to chat

//      if(res.data.success){

//         dispatch(setUser(res.data.user));
        
//         navigate("/");
//         toast.success('🟢 Successfully Login!');
     
//       }
//   } catch (err) {
//     console.error("Google login failed:", err);
//   }
// };

  
   const handleGoogleLogin = async () => {
  try {

    const auth=getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    // console.log("hel");

    

    const res = await axios.post(`${USER_API_END_POINT}/google`, { token}, {

     
      withCredentials: true,
    });

    // now you can use res.data.user
    // setUser(res.data.user); // or redirect to chat

     if(res.data.success){

        dispatch(setUser(res.data.user));
        
        navigate("/");
        toast.success('🟢 Successfully Login!');
     
      }
  } catch (err) {
    console.error("Google login failed:", err);
  }
};

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

      // const res = await axios.post(`${USER_API_END_POINT}/login`"https://engineers-hub-1.onrender.com/login",formData, {
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
      <div className="temp">
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
            submitted ?<div style={{
    display: 'flex',
    justifyContent: 'center',
    
  }}><Spinnerbutton/></div>
            : <button type="submit">Submit</button>

          } <button type="button" onClick={handleGoogleLogin}>Login with Google</button>

          

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
