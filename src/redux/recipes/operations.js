import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


axios.defaults.baseURL = 'https://byte-bitebd.onrender.com/';


export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (_, thunkAPI) => {
  try {
    const res = await axios.get('api/recipes'); 
    return res.data.data.data;
  } catch (error){
    return thunkAPI.rejectWithValue(error.message); 
  }
});


// export const addContact = createAsyncThunk('contacts/addContact', async (newContact, thunkAPI) => {
//   try {
//     const res = await axios.post('/contacts', newContact);
//     return res.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// })

// export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, thunkAPI) => {
//   try {
//     const res = await axios.delete(`/contacts/${contactId}`);
//     return res.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// })

// export const changeContact = createAsyncThunk('contacts/changeContact', async ({ id, name, number }, thunkAPI) => {
//   try {
//     const res = await axios.patch(`/contacts/${id}`, {name: name, number:number});
//     return res.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// })