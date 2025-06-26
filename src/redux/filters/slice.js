import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
  name: 'filters',
  initialState: {
    contactData: ""
  },
  reducers: {
    changeFilter: (state, action) => {
      state.contactData = action.payload;
    }
  }
})

export default slice.reducer;

export const { changeFilter } = slice.actions;