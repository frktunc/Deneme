import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    userRole: null,
    loggedIn: false,
  };
  
const authSlice = createSlice({
    name: 'auth',
    initialState,
        
    reducers:{
        setToken:(state,action) => {
            state.token = action.payload.token;
            state.userRole = action.payload.userRole;
            state.loggedIn = action.payload.loggedIn;
        },
        clearToken: (state) => {
            state.token=null;
            state.userRole=null;
            state.loggedIn=false
        }
    }
})
export const {setToken,clearToken} = authSlice.actions;
export default authSlice.reducer;