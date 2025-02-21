import {createSlice} from "@reduxjs/toolkit";
// import { setsearchCompanyByText } from "./companySlice";
const authSlice =createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        allJobs:[],
        singleJob:null,
        companies:[],
        allAdminJobs:[],
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
        searchingQuery:"",
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload;
        },
        setCompanies:(state,action)=>{
            state.companies=action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload;
        },
        setsearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload;
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload;
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery=action.payload;
        },
        setSearchingQuery:(state,action)=>{
            state.searchingQuery=action.payload;
        }
    }
});
export const {setLoading,setUser,setAllJobs,setSingleJob,setCompanies,setAllAdminJobs,setsearchJobByText,setAllAppliedJobs,setSearchedQuery,setSearchingQuery}=authSlice.actions;
export default authSlice.reducer;