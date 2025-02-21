import React from 'react'

const Footer = () => {

   
  return (
    <div>

<footer style={{width:"80%",margin:"8rem auto",backgroundColor:"gray"}}>
      <div  style={{display:"flex",justifyContent:"space-between",padding:"70px 70px"}}>
       
        <div >
          <h2 style={{padding:"0px"}}>JobEngineersPro</h2>
          <p style={{padding:"0px"}}>
            Your trusted partner in job searching. Find your dream job today!
          </p>
          © {new Date().getFullYear()} JobEngineersPro. All rights reserved.

        </div>

        
       

       
       
      

      


        <div style={{}}>
          
          
          <p style={{ textAlign: "right" }}>🔵 LinkedIn 📘 Facebook 🐦 Twitter</p>

          </div>
       
        
      </div>


    </footer>
      
    </div>
  )
}

export default Footer
