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

            <h2 style={{px:"4",py:"2",font:"medium"}}>No 1 Job Engineers Website</h2>
            <h1 style={{text:"15px"}}>Search , Apply & <br/> Get Your<span style={{color:"#0a9ecf9a"}}>Dream Jobs</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In quasi soluta molestiae dolore atque voluptates.</p>

            <div><input className="inputStyle" type="text" placeholder='Find your dream jobs'
            onChange={(e)=>setquery(e.target.value)}
            
            />

            <button onClick={searchJobHandler} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Search</button>
            
            </div>
        
        </div>
    )
}
export default HeroSection
