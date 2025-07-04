
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axiosConfig";


export const genericErrorMessage =
  "There was an error. Try to update page a bit later";



export const fetchRecipes = generateThunk("recipes/fetchRecipes", () => {
  return axios.get("/recipes");
});


export const addRecipe = generateThunk("recipes/addRecipe", (formData) => {
  return axios.post("/recipes/add-recipe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
});


export const fetchRecipeById = generateThunk("recipes/fetchById", (id) =>
  axios.get(`/recipes/${id}`)
);

function generateThunk(name, requestFunc) {
  return createAsyncThunk(name, async (arg, thunkAPI) => {
    try {
      const response = await requestFunc(arg);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });
}
