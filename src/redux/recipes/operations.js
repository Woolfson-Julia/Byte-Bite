import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const genericErrorMessage =
  "There was an error. Try to update page a bit later";

axios.defaults.baseURL = "https://byte-bite-two.vercel.app/";

export const fetchRecipes = generateThunk("recipes/fetchAll", () => {
  return axios.get("/recipes");
});

export const addRecipe = generateThunk("recipes/add", (contact) => {
  return axios.post("/recipes", contact);
});

export const deleteRecipe = generateThunk("recipes/delete", (contactId) => {
  return axios.delete(`/recipes/${contactId}`);
});

export const updateRecipe = generateThunk("recipes/update", (contact) => {
  const data = { name: contact.name, number: contact.number };
  return axios.patch(`/recipes/${contact.id}`, data);
});

function generateThunk(name, requestFunc) {
  return createAsyncThunk(name, async (arg, thunkAPI) => {
    try {
      const response = await requestFunc(arg);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });
}
