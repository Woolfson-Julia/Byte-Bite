import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
  name: 'filters',
  initialState: {
    recipe: ""
  },
  reducers: {
    changeFilter: (state, action) => {
      state.recipe = action.payload;
    }
  }
})

export default slice.reducer;

export const { changeFilter } = slice.actions;