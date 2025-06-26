import toast from 'react-hot-toast';
import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, changeContact } from './operations';
import { logOut } from '../auth/operations';

const slice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, state => {
        state.loading = false;
        state.error = true;
        toast.error("Please reload there was an error!!!!");
      })
      .addCase(addContact.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        toast.success("New contact has been added");
      })
      .addCase(addContact.rejected, state => {
        state.loading = false;
        state.error = true;
        toast.error("Please reload there was an error!!!!");
      })
      .addCase(deleteContact.pending, state => {
        state.loading = true;
        state.error = null;        
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        toast.success("Contact has been deleted");
      })
      .addCase(deleteContact.rejected, state => {
        state.loading = false;
        state.error = true;
        toast.error("Please reload there was an error!!!!");
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
      })
      .addCase(changeContact.pending, state => {
        state.loading = true;
        state.error = null;  
      })
      .addCase(changeContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
        state.items[index] = action.payload;
        }
        toast.success("Contact has been changed");
      })
      .addCase(changeContact.rejected, state => {
        state.loading = false;
        state.error = true;
        toast.error("Please reload there was an error!!!!");
      })
  }
})

export default slice.reducer;