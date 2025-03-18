import React from 'react'


import { useRef, useEffect,useState } from "react";
import Spinnerbutton from './spinner/Spinnerbutton';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from "./utils/constant";
import axios from "axios";
import { toast } from 'react-toastify';
// import store from './redux/store';
import {  setUser } from './redux/authSlice';
import "./Navbar.css";
const UpdateProfileDialog = ({ open, setOpen }) => {
    const dialogRef = useRef(null);

    const [loading,setloading]=useState(false);

    const {user}=useSelector(store=>store.auth);

    const dispatch =useDispatch();

    const [input, setInput]= useState({
        name:user?.fullname||"",
        email:user?.email||"",
        phoneNumber:user?.phoneNumber||"",
        bio:user?.profile?.bio||"",
        skills:user?.profile?.skills?.join(", ") || "",
        file:user?.profile?.resume||"",

    })
    const changeEventHandler=(e)=>{
       
        setInput({...input,[e.target.name]:e.target.value});
    }

    const filechangeHandler=(e)=>{
        const file=e.target.files?.[0];
        if(file){
            setInput({...input,file});
        }
       
       
       
    }

    const submitHandler=async (e)=>{
        
        e.preventDefault();

        const formData=new FormData();
        formData.append("fullname",input.name);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("bio",input.bio);
        formData.append("skills",input.skills);
        
        if(input.file){
            formData.append("file",input.file);
        }


        try{
           
            setloading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      });

      if(res.data.success){

        dispatch(setUser(res.data.user));
        
        // navigate("/");
        toast.success('🟢 Successfully Updated');
     
      }

        }catch(error){
            console.log(error);
            toast.error(error.res.data.message);

        }
      
        finally{
        setloading(false);
        }
        setOpen(false);
    }

    useEffect(() => {
        if (open) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [open]);


    return (
        // <div>
        //     <div style={{display:"flex",flexDirection:"column",textAlign:"center",gap:"4px"}}>
        //   <button onClick={() => setOpen(true)} style={{padding:"2px",background:"blue",color:"white"}}>
        //     Open Modal team
        //   </button>

        //   <modal  isOpen={false} onRequestClose={() => setOpen(true)} style={{padding:"4px",backgroundColor:"black"}}>
        //     <h2>React Modal</h2>
        //     <p>This is a modal using react-modal.</p>
        //     <button onClick={() => setOpen(false)} style={{marginTop:"2px",padding:"2px",backgroundColor:"red",color:"white"}}>
        //       Close
        //     </button>
        //   </modal>
        // </div>
        <div style={{display:"flex",flexWrap:"wrap"}} className="dialogbhai">
            {/* <button onClick={() => dialogRef.current.showModal()} className="p-2 bg-blue-500 text-white rounded">
        Open Dialog
      </button> */}

            <dialog ref={dialogRef} style={{ width: "50rem", height: "40rem" }} className="p-4 rounded shadow-lg">

                <h4>Update Profile</h4>
                <form  onSubmit={submitHandler}>


                    <div style={{ margin: "22px" }}>

                        <label htmlFor="name" className='text-right'>Name </label>
                        <input id="name" name="name" type="text" onChange={changeEventHandler} value={input.name||""} style={{marginLeft:"40px", height: "3rem", width: "40rem", fontSize: "20px" }} className='col-span-20' />

                    </div>
                    <div style={{ margin: "20px" }}>

                        <label htmlFor="email" className='text-right'>Email </label>
                        <input id="email" name="email" type="email" onChange={changeEventHandler} value={input.email} style={{marginLeft:"44px",  height: "3rem", width: "40rem", fontSize: "20px" }} className='col-span-20' />

                    </div>
                    <div style={{ margin: "21px" }}>

                        <label htmlFor="phoneNumber" className='text-right'>Number </label>
                        <input id="phoneNumber" name="phoneNumber" type="number" onChange={changeEventHandler} value={input.phoneNumber} style={{marginLeft:"25px",  height: "3rem", width: "40rem", fontSize: "20px" }} className='col-span-20' />

                    </div>
                    <div style={{ margin: "22px" }}>

                        <label htmlFor="bio" className='text-right'>Bio </label>
                        <input id="bio" name="bio" type="text" onChange={changeEventHandler} value={input.bio} style={{marginLeft:"60px",  height: "3rem", width: "40rem", fontSize: "20px" }} className='col-span-20' />

                    </div>
                    <div style={{ margin: "21px" }}>

                        <label htmlFor="skills" className='text-right'>Skills </label>
                        <input id="skills" name="skills" onChange={changeEventHandler} value={input.skills} style={{marginLeft:"50px",  height: "3rem", width: "40rem", fontSize: "20px" }} className='col-span-20' />

                    </div>

                    <div style={{ margin: "21px" }}>

                        <label htmlFor="file" className='text-right'>Resume </label>
                        <input id="file" name="file" onChange={filechangeHandler} type="file"  accept='application/pdf' style={{marginLeft:"30px",  height: "3rem", width: "20rem", fontSize: "20px" }} className='col-span-20' />

                    </div>
                    
                    {
                     
                     loading ? <Spinnerbutton/>: <button type="submit">Update</button>
                   
                  }
                 
                
                </form>
                <button style={{marginTop:"10px"}} onClick={() => setOpen(false)}>
                    Close
                </button>
               







                
            </dialog>
        </div>


        // </div>
    )
}

export default UpdateProfileDialog
