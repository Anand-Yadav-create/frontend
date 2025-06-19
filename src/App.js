import React from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/companies/Companies";
import CompanyCreate from "./components/companies/CompanyCreate";
import CompanySetup from "./components/companies/CompanySetup";
import AdminJobs from "./components/companies/AdminJobs";
import PostJob from "./components/companies/PostJob";
import Applicants from "./components/companies/Applicants";
import ProtectedRoute from "./components/companies/ProtectedRoute";
import ExternalJobs from "./components/ExternalJobs";






 
function App() {



  
 
  return (
    <Router>
    
    

    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/jobs" element={<Jobs/>}/>

    <Route path="/browse" element={<Browse/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/description/:id" element={<JobDescription/>}/>
    <Route path="/external" element={<ExternalJobs/>} />



    <Route path="/admin/companies" element={<ProtectedRoute><Companies/></ProtectedRoute>}/>
  <Route path="/admin/companies/create" element={<ProtectedRoute><CompanyCreate/></ProtectedRoute>}/>
    <Route path="/admin/companies/:id" element={<CompanySetup/>}/>

    <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs/></ProtectedRoute>}/>
    <Route path="/admin/jobs/create" element={<ProtectedRoute><PostJob/></ProtectedRoute>}/>

    <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants/></ProtectedRoute>}/>



    </Routes>
    <ToastContainer />


      
      
    
    
    


    </Router>
   

  );
};






export default App;
