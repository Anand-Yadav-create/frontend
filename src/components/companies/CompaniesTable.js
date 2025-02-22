// import React from 'react';
// import "../Table.css";


// import Avtar from '../shared/Avtar';
// import * as Popover from "@radix-ui/react-popover";
// import { useSelector } from 'react-redux';


// const data=[{ id: 1, name: "Alice", age: 25 },
//     { id: 2, name: "Bob", age: 30 },
//     { id: 3, name: "Charlie", age: 28 },]

// const CompaniesTable = () => {
//   const {companies}=useSelector(store=>store.company);
//   return (
//     <div>
//         <h4>A List of your recent register companies</h4>
//        <table border="1">
        
//       <thead>
//         <tr>
//           <th>LOGO</th>
//           <th>Name</th>
//           <th>Date</th>
//           <th style={{textAlign:"center"}}>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {

//           companies.length===0?<span>No Jobs are found</span>:(
//             <>
//             {
//               companies?.map((company)=>{
//                 return (
//                   <div>

// <tr key={company._id}>
//             <td><Avtar url={company?.logo}/></td>
//             <td>{company.name}</td>
//             <td>{company.createdAt.split("T")[0]}</td>
//             <td style={{textAlign:"center"}}>

//             <Popover.Root>
//       <Popover.Trigger className="px-4 py-2 bg-blue-500 text-white rounded-md">
//       Edit
//       </Popover.Trigger>
//       <Popover.Portal>
//         <Popover.Content className="p-4 bg-white border rounded-lg shadow-lg"style={{padding:"4px",backgroundColor:"white",border:"2px solid black"}}>
//            <button>Edit the Company</button>
//           {/* <Popover.Close className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md">
//             Close
//           </Popover.Close> */}
//         </Popover.Content>
//       </Popover.Portal>
//     </Popover.Root>


//         </td>
//           </tr>
                    

//                   </div>

//                 )
//               })
//             }
//             </>
//           )
//         }
     
      
        
//       </tbody>
//     </table>
//     </div>
//   )
// }

// export default CompaniesTable


import React, { useState ,useEffect} from "react";
import "../Table.css";
import Avtar from "../shared/Avtar";
import * as Popover from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {

  useGetAllCompanies();
  // const { companies } = useSelector((store) => store.auth)||{companies:[]};
  const { companies} = useSelector((store) => store.auth || {});
  const {searchCompanyByText}=useSelector((store)=>store.company);

  const [filterCompany,setFilterCompany]=useState(companies);

  const navigate=useNavigate();
  useEffect(()=>{

    const filteredCompany=companies.length>=0&&companies.filter((company)=>{
      if(!searchCompanyByText){
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });

    setFilterCompany(filteredCompany);

  },[companies,searchCompanyByText])

  return (
    <div>
      <h4>A List of your recent registered companies</h4>
      <table border="1">
        <thead>
          <tr>
            <th>LOGO</th>
            <th>Name</th>
            <th>Date</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterCompany.length <= 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Companies Found
              </td>
            </tr>
          ) : (
            filterCompany.map((company) => (
              <tr key={company._id}>
                <td>
                  <Avtar url={company?.logo} />
                </td>
                <td>{company.name}</td>
                <td>{company.createdAt?.split("T")[0]}</td>
                <td style={{ textAlign: "center" }}>
                  <Popover.Root>
                    <Popover.Trigger className="px-4 py-2 bg-blue-500 text-white rounded-md">
                      Edit
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        className="p-4 bg-white border rounded-lg shadow-lg"
                        style={{
                          padding: "4px",
                          backgroundColor: "white",
                          border: "2px solid black",
                        }}
                      >
                        <button onClick={()=>navigate(`/admin/companies/${company._id}`)}>Edit the Company</button>
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;

