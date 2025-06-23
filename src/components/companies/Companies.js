import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate  } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setsearchCompanyByText } from '../redux/companySlice'

import '../Navbar.css'
const Companies = () => {
 
  useGetAllCompanies();

  const [input,setInput]=useState("");
  
  const navigate=useNavigate();
  const dispatch=useDispatch();


  

  useEffect(()=>{
    dispatch(setsearchCompanyByText(input));

  },[input])


  return (
    // <div>
    //     <Navbar/>
    //     <div style={{maxWidth:"80%",margin:"10px auto"}}>
    //         <div className="cl" style={{marginTop:"3px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>

    //             <input style={{width:"20rem",height:"30px",fontSize:"20px"}} placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)}/>

    //             <button onClick={()=>navigate("/admin/companies/create")}>New Company</button>


    //         </div>

    //          <CompaniesTable/>


    //     </div>
    // </div>

    <div>
  <Navbar />

  <div style={{ maxWidth: "90%", margin: "10px auto", padding: "10px", boxSizing: "border-box" }}>
    
    <div
      style={{
        marginTop: "8px",
        display: "flex",
        flexWrap: "wrap", // enables wrapping on smaller screens
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <input
        style={{
          flex: "1 1 250px", // grows/shrinks, min width 250px
          maxWidth: "500px",
          height: "36px",
          fontSize: "16px",
          padding: "0 10px",
          boxSizing: "border-box"
        }}
        placeholder="Filter by name"
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={() => navigate("/admin/companies/create")}
        style={{
          height: "36px",
          fontSize: "16px",
          padding: "0 16px",
          backgroundColor: "#0a9ecf9a",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        New Company
      </button>
    </div>

    <div style={{ marginTop: "20px" }}>
      <CompaniesTable />
    </div>
  </div>
</div>

  )
}

export default Companies
