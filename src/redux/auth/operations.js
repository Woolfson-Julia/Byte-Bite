import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = value;
};


export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('/users/signup', credentials);
    setAuthHeader(`Bearer ${res.data.token}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('/users/login', credentials);
    setAuthHeader(`Bearer ${res.data.token}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  await axios.post('/users/logout');
  setAuthHeader(''); 
});

export const refreshUser = createAsyncThunk('auth/refresh',
  async (_, thunkAPI) => {
  try {
    const reduxState = thunkAPI.getState();
    setAuthHeader(`Bearer ${reduxState.auth.token}`);
    const res = await axios.get('/users/current');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
  }, {
  condition: (_, thunkAPI) => {
  const reduxState = thunkAPI.getState();
  return reduxState.auth.token !== null;
  }
}
);