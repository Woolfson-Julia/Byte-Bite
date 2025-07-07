import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchIngredients } from "./operations";

const slice = createSlice({
  name: "filters",
  initialState: {
    recipe: "",
    category: "",
    ingredient: "",
    categories: [],
    ingredients: [],
    loading: false,
    error: null,
  },
  reducers: {
    changeFilter: (state, action) => {
      state.recipe = action.payload;
    },
    changeCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    changeIngredientFilter: (state, action) => {
      state.ingredient = action.payload;
    },
    resetFilters: (state) => {
      state.recipe = "";
      state.category = "";
      state.ingredient = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default slice.reducer;

export const {
  changeFilter,
  changeCategoryFilter,
  changeIngredientFilter,
  resetFilters,
} = slice.actions;
