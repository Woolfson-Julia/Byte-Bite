import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axiosConfig.js";

export const genericErrorMessage =
  "There was an error. Please try again a bit later.";

export const fetchCategories = generateThunk("filters/fetchCategories", () => {
  return axios.get("/categories");
});
export const fetchIngredients = generateThunk(
  "filters/fetchIngredients",
  () => {
    return axios.get("/ingredients");
  }
);

function generateThunk(name, requestFunc) {
  return createAsyncThunk(name, async (arg, thunkAPI) => {
    try {
      const response = await requestFunc(arg);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || genericErrorMessage
      );
    }
  });
}
