import { createSlice } from "@reduxjs/toolkit";

const applicationSlice=createSlice({
    name:"applicantion",
    initialState:{
        applicants:[],
       
       
    },
    reducers:{
        setAllapplicants:(state,action)=>{
            state.applicants=action.payload;
        }
       
     
    }
});
export const {setAllapplicants}=applicationSlice.actions;
export default applicationSlice.reducer;