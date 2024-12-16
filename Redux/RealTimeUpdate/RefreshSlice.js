import { createSlice } from "@reduxjs/toolkit";



const refreshSlice=createSlice({
    name:'ReloadApiCall',
    initialState:1,
    reducers:{
        callApi:(state,action)=>{
               return state=state+1;
        }
    }

})

export const {callApi} = refreshSlice.actions;

export default refreshSlice.reducer;
