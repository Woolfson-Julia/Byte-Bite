import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axiosConfig";

const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = value;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(
        "/auth/register",
        credentials
        // credentials,
        // { withCredentials: true }
      );
      setAuthHeader(`Bearer ${res.data.accessToken}`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(
        "/auth/login",
        credentials
        // credentials,
        // { withCredentials: true }
      );
      setAuthHeader(`Bearer ${res.data.accessToken}`); //тут стоял просто токен, исправила на accessToken
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async () => {
  await axios.post("/auth/logout");
  setAuthHeader("");
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(`Bearer ${reduxState.auth.accessToken}`);
      const res = await axios.get("/users/current");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  }
);
