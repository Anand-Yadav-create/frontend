import React from "react";
import Avatar from "react-avatar";

const Avtar = ({url}) => {
  return (
    <div style={{marginTop:"5px"}}>
      {/* <h1>User Avatars</h1> */}
      {/* <Avatar name="John Prof" size="40" round={true} /> */}
      {/* <Avatar name="Jane Doe" size="100" color="#007bff" /> */}
      <Avatar src={url||"https://media.istockphoto.com/id/178447404/photo/modern-business-buildings.jpg?s=612x612&w=0&k=20&c=MOG9lvRz7WjsVyW3IiQ0srEzpaBPDcc7qxYsBCvAUJs="} size="30" round={true} />
    </div>
  );
};

export default Avtar;
