import {createSlice} from "@reduxjs/toolkit";
const companySlice =createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        searchCompanyByText:"",
        
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload;
        },
        setsearchCompanyByText:(state,action)=>{
            state.searchCompanyByText=action.payload;
        },
        
       
    }
});
export const {setSingleCompany,setsearchCompanyByText}=companySlice.actions;
export default companySlice.reducer;