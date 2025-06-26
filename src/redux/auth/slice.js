import toast from 'react-hot-toast';
import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations";


const authSlice = createSlice({
  name: 'auth',
  initialState: {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null
  },
  extraReducers: (builder) => 
    builder
      .addCase((register.pending), state => {
        state.loading = true;
        state.error = null;
      })      
      .addCase(register.fulfilled, (state, actions) => {
        state.user = actions.payload.user;
        state.token = actions.payload.token;
        state.isLoggedIn = true;
        state.loading = false;        
    })
      .addCase(register.rejected, (state) => {
        state.loading = false;
        state.error = true;
        toast.error("Invalid email or password. Try again");
      }).addCase(logIn.pending, state => {
        state.loading = true;
        state.error = null;      
      }).addCase(logIn.fulfilled, (state, actions) => {
        state.user = actions.payload.user;
        state.token = actions.payload.token;
        state.isLoggedIn = true;  
        state.loading = false;        
      })
      .addCase(logIn.rejected, (state) => {
        state.loading = false;
        state.error = true;  
        toast.error("Invalid email or password. Try again");
      })
      .addCase(logOut.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.loading = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;        
      })
      .addCase(refreshUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.isRefreshing = true;
      })      
      .addCase(refreshUser.fulfilled, (state, actions) => {
        state.user = actions.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.loading = false;
        state.error = true;  
        toast.error("Oops! An error occurred. Please try refreshing the page or log in again.");
      })  
  })

export default authSlice.reducer;