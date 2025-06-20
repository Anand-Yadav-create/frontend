


import React, { useState ,useEffect } from "react";


import { useSelector } from "react-redux";


import CompanyCard from "./CompanyCard"; // Adjust path if needed

import "./CompanyList.css";

const CompaniesTable = () => {


  const { companies} = useSelector((store) => store.auth || {});
  const {searchCompanyByText}=useSelector((store)=>store.company);

  const [filterCompany,setFilterCompany]=useState(companies);

  


 
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
     


       <div className="company-grid">
      {filterCompany.length === 0 ? (
        <div className="no-companies">No Companies Found</div>
      ) : (
        filterCompany.map((company) => (
          <CompanyCard key={company._id} company={company} />
        ))
      )}
    </div>
    </div>
  );
};

export default CompaniesTable;

