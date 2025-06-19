import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from './redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const HeroSection =()=>{

    

      const [query,setquery]=useState("");

      const dispatch=useDispatch();
      const navigate=useNavigate();

      const searchJobHandler=()=>{

        dispatch(setSearchedQuery(query));
        navigate("/browse");


      }



    return (
        <div style={{textAlign:"center"}}>

            <h2 style={{px:"4",py:"2",font:"medium",color:"red",text:"15px"}}>ALL In one Place</h2>


            <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
  <img
    src="/banner.jpg"
    alt="Job Portal Banner"
    style={{ width: '80%', height: '100%', objectFit: 'cover' }}
  />
</div>
            <h1 style={{text:"15px",color:"red",margin:"10px 20px"}}>You can Search , Apply and Get Your<span >Dream Jobs</span></h1>
            <p style={{margin:"10px 30px",fontWeight:"bold"}}>Discover thousands of job opportunities aggregated from social platforms, all in one place.<br/>
Recruiters can seamlessly post jobs after registration, while users can log in to search and apply with ease.









</p>

            <div><input className="inputStyle" type="text" placeholder='Find your dream jobs'
            onChange={(e)=>setquery(e.target.value)}
            
            />

            <button onClick={searchJobHandler} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Search</button>
            
            </div>
        
        </div>
    )
}
export default HeroSection
