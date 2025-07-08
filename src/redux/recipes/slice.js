import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes, addRecipe, fetchRecipeById } from "./operations";
import { logOut } from "../auth/operations";
import {
  fetchRecipesWithFilters,
  removeRecipeFromFav,
  addRecipeToFav,
  fetchFavorites,
  fetchOwnRecipes,
  removeOwnRecipes
} from "./operations";

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    // тут object
    favorites: [],
    own:[],
    recipe: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Отримати всі рецепти
    buildReducers(builder, fetchRecipes, (state, action) => {
      state.items = action.payload;
    });
    buildReducers(builder, fetchRecipesWithFilters, (state, action) => {
      const page = action.meta.arg?.page || 1;

      if (page === 1) {
        state.items = action.payload; // первая страница — замена
      } else {
        // остальные страницы — добавляем рецепты, остальные поля сохраняем
        state.items = {
          ...state.items,
          recipes: [...state.items.recipes, ...action.payload.recipes],
        };
      }

      // state.items = action.payload;
    });

    // Додавання рецепту
    buildReducers(builder, addRecipe, (state, action) => {
      state.items.push(action.payload);
    });

    // Один рецепт по ID
    buildReducers(builder, fetchRecipeById, (state, action) => {
      state.recipe = action.payload.recipes;
    });

    buildReducers(builder, addRecipeToFav, (state, action) => {
      state.favorites = action.payload;
      if (state.recipe) {
        state.recipe.isFavorite = true;
      }
    });
    
    buildReducers(builder, removeRecipeFromFav, (state, action) => {
      state.favorites = action.payload;
      if (state.recipe) {
        state.recipe.isFavorite = false;
      }
    });
    

    buildReducers(builder, fetchFavorites, (state, action) => {
      state.favorites = action.payload;
    });

    buildReducers(builder, fetchOwnRecipes, (state, action) => {
      state.own = action.payload;
    });

    buildReducers(builder, removeOwnRecipes, (state, action) => {
  state.own = state.own.filter(recipe => recipe._id !== action.payload);
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
      state.recipe.isFavorite = false; 
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
      state.items = [];
    });
}

export default slice.reducer;

export const { setDeleteRecipeId, setEditRecipeId } = slice.actions;
