import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setsearchCompanyByText } from '../redux/companySlice'

const Companies = () => {
 
  useGetAllCompanies();

  const [input,setInput]=useState("");
  
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(setsearchCompanyByText(input));

  },[input])
  return (
    <div>
        <Navbar/>
        <div style={{maxWidth:"80%",margin:"10px auto"}}>
            <div className="cl" style={{marginTop:"3px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>

                <input style={{width:"20rem",height:"30px",fontSize:"20px"}} placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)}/>

                <button onClick={()=>navigate("/admin/companies/create")}>New Company</button>


            </div>

             <CompaniesTable/>


        </div>
    </div>
  )
}

export default Companies
