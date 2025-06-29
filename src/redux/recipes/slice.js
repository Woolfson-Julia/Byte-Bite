import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  addRecipe,
  deleteRecipe,
  updateRecipe,
} from "./operations";
import { logout } from "../auth/operations";

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    loading: false,
    error: null,
    deleteItemId: null,
    editItemId: null,
  },
  reducers: {
    setDeleteRecipeId: (state, action) => {
      state.deleteItemId = action.payload;
    },
    setEditRecipeId: (state, action) => {
      state.editItemId = action.payload;
    },
  },
  extraReducers: (builder) => {
    buildReducers(builder, fetchRecipes, (state, action) => {
      state.items = action.payload;
    });

    buildReducers(builder, addRecipe, (state, action) => {
      state.items.push(action.payload);
    });

    buildReducers(builder, deleteRecipe, (state, action) => {
      state.items = state.items.filter(
        (recipe) => recipe.id !== action.payload.id
      );
    });

    buildReducers(builder, updateRecipe, (state, action) => {
      var updatedRecipe = action.payload;
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id !== updatedRecipe.id) continue;

        state.items[i] = updatedRecipe;
        break;
      }
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.items = [];
    });
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
