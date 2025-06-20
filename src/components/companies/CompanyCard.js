import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { useNavigate } from "react-router-dom";
import "./CompanyCard.css"; // Import the CSS

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  return (
    <div className="company-card">
      <img
        src={company.logo}
        alt={company.name}
        className="company-logo"
      />
      <h2 className="company-name">{company.name}</h2>
      <p className="company-date">
        Created: {company.createdAt?.split("T")[0]}
      </p>
      <button
  className="edit-button"
  onClick={() => navigate(`/admin/companies/${company._id}`)}
>
  Edit
</button>
    </div>
  );
};

export default CompanyCard;