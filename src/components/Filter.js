import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from './redux/authSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';

const filterData = [
  {
    filterType: "Location",
    arrays: ["New Delhi", "Banglore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industries",
    arrays: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    arrays: ["0-40k", "41-1lakh", "1lakh to 5lakh"]
  }
]

const Filter = () => {
  useGetAllJobs();

  const [selected, setSelected] = useState("");


  // const changeHandler=(value)=>{
  //   setSelected(value);
  // }

  const dispatch=useDispatch();

  useEffect(()=>{

    dispatch(setSearchedQuery(selected));
    
  },[selected]);


  return (
    <div style={{marginLeft:"10px"}}>

      <h4>Filter Jobs</h4>

      <hr className='mt-1' />
      {
        filterData.map((data, index) => (
          <div key={index}> 
            <h4 style={{margin:"0px 2px"}}>{data.filterType}</h4>{
              data.arrays.map((item, idx) => {

                const itemId=`r${index}-${idx}`;

                return (
                  <div key={itemId}>

                    <label   htmlFor={itemId} className="flex items-center space-x-2">
                      <input
                       
                        id={itemId}
                        type="radio"
                        value={item}
                        checked={selected === item}
                        onChange={(e) => setSelected(e.target.value)}


                      />
                      <span>{item}</span>
                    </label>
                  </div>
                )

              }

              )
            }
          </div>
        ))
      }



    </div>
  )
}

export default Filter
