import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token:null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true
        },
        logout:(state) =>{
            state.user = null;
            state.token = null;
            state.isAuthenticated = false
        },
        loadUser: (state,action) => {
            const userData = action.payload;
            state.user = {
                ...userData,
                id: userData._id || userData.id
            }
            state.isAuthenticated = true;
        }

    }

});

export const {login,logout,loadUser} = authSlice.actions;
export default authSlice.reducer;