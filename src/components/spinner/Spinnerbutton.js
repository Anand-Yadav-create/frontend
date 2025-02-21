import React from "react";

const Spinnerbutton = () => {
  

  
  return (
    <button
      
      
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        background: "red",
        color: "white",
        border: "none",
       
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin:"10px 5px"
      }}
    >
      
    
          <div className="spinner"></div>
          Please wait...
        
    
      <style>
        {`
          .spinner {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            width: 15px;
            height: 15px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </button>
  );
};

export default Spinnerbutton;
