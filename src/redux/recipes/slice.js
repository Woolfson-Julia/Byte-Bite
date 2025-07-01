import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes, addRecipe, fetchRecipeById } from "./operations";
import { logOut } from "../auth/operations";

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Отримати всі рецепти
    buildReducers(builder, fetchRecipes, (state, action) => {
      state.items = action.payload;
    });

    // Додавання рецепту
    buildReducers(builder, addRecipe, (state, action) => {
      state.items.push(action.payload);
    });

    // Один рецепт по ID
    buildReducers(builder, fetchRecipeById, (state, action) => {
      state.items = state.items.filter(
        (recipe) => recipe.id !== action.payload.id
      );
    });

    /*buildReducers(builder, deleteRecipe, (state, action) => {
      state.items = state.items.filter(
        (recipe) => recipe.id !== action.payload.id
      );
    });

    buildReducers(builder, updateRecipe, (state, action) => {
      const updatedRecipe = action.payload;
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id !== updatedRecipe.id) continue;

        state.items[i] = updatedRecipe;
        break;
      }
    });*/

    builder.addCase(logOut.fulfilled, (state) => {
      state.items = [];
    }).addCase;
  },
});

function buildReducers(builder, operation, reducerFunc) {
  builder
    .addCase(operation.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(operation.fulfilled, (state, action) => {
      state.loading = false;
      reducerFunc(state, action);
    })
    .addCase(operation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}

export default slice.reducer;

export const { setDeleteRecipeId, setEditRecipeId } = slice.actions;
