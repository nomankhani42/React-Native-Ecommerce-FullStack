import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
              user:{
              
              },
              token:null,
              isAuthenticated:false
  },
  reducers: {
    loginSuccess: (state, action) => {
          
      state.user=action.payload.user;
      state.token=action.payload.token;
      state.isAuthenticated=true;
      return state;
    },
    logoutSuccess:  (state,action) => {
      state.user={};
      state.token=null;
      state.isAuthenticated=false;
      return state;
    },
    updateProfile:(state,action)=>{
      state.user=action.payload;
      return state;
    }
  },
});

export const {loginSuccess, logoutSuccess, updateProfile} = AuthSlice.actions;
export default AuthSlice.reducer;
