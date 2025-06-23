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
//         <div style={{textAlign:"center"}}>

//             <h1 style={{px:"4",py:"2",font:"medium",color:"red",text:"15px"}}>ALL IN ONE PLACE</h1>


//             <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
//   <img
//     src="/banner.jpg"
//     alt="Job Portal Banner"
//     style={{ width: '80%', height: '100%', objectFit: 'cover' }}
//   />
// </div>
//             <h2 style={{text:"15px",color:"red",margin:"10px 20px"}}>You can Search , Apply and Get Your<span >Dream Jobs</span></h2>
//             <p style={{margin:"10px 30px",fontWeight:"bold"}}>Discover thousands of job opportunities aggregated from social platforms, all in one place.<br/>
// Recruiters can seamlessly post jobs after registration, while users can log in to search and apply with ease.









// </p>

//             <div><input className="inputStyle" type="text" placeholder='Find your dream jobs'
//             onChange={(e)=>setquery(e.target.value)}
            
//             />

//             <button onClick={searchJobHandler} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Search</button>
            
//             </div>
        
//         </div>



<div style={{ textAlign: "center", padding: "20px", boxSizing: "border-box" }}>

  <h1 style={{
    padding: "8px",
    fontWeight: "800",
    color: "red",
    fontSize: "20px"
  }}>
    ALL IN ONE PLACE
  </h1>

  <div style={{
    width: "100%",
    height: "auto",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center"
  }}>
    <img
      src="/banner.jpg"
      alt="Job Portal Banner"
      style={{
        width: "80%",
        maxWidth: "750px",
        height: "300px",
        objectFit: "cover"
      }}
    />
  </div>

  <h2 style={{
    fontSize: "20px",
    color: "red",
    margin: "10px 20px"
  }}>
    You can Search, Apply and Get Your <span style={{ fontWeight: "bold" }}>Dream Jobs</span>
  </h2>

  <p style={{
    margin: "10px 30px",
    fontWeight: "bold",
    fontSize: "18px"
  }}>
    Discover thousands of job opportunities aggregated from social platforms, all in one place.<br />
    Recruiters can seamlessly post jobs after registration, while users can log in to search and apply with ease.
  </p>

  <div style={{
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px"
  }}>
    <input
      type="text"
      placeholder="Find your dream jobs"
      onChange={(e) => setquery(e.target.value)}
      style={{
        padding: "10px",
        width: "80%",
        maxWidth: "400px",
        fontSize: "14px",
        borderRadius: "5px",
        border: "1px solid #ccc"
      }}
    />

    <button
      onClick={searchJobHandler}
      style={{
        backgroundColor: "#0a9ecf9a",
        color: "white",
        padding: "10px 20px",
        borderRadius: "6px",
        fontSize: "14px",
        cursor: "pointer",
        border: "none"
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = "#0a9ecf9a"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#0a9ecf9a"}
    >
      Search
    </button>
  </div>

</div>

    )
}
export default HeroSection
