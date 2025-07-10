import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes, addRecipe, fetchRecipeById } from "./operations";
import { logOut } from "../auth/operations";
import {
  fetchRecipesWithFilters,
  removeRecipeFromFav,
  addRecipeToFav,
  fetchFavorites,
  fetchOwnRecipes,
  removeOwnRecipes,
} from "./operations";

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    // тут object
    //     favorites: [],
    //     favoritesTotalItems: 1,
    //     ownTotalItems: 1,
    //     own: [],
    // favorites: [],
    // own:[],
    favorites: {
      recipes: [],
      page: 1,
      totalItems: 0,
    },
    own: {
      recipes: [],
      page: 1,
      totalItems: 0,
    },
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
      // state.items.push(action.payload);
      state.items.recipes.push(action.payload.recipes);
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
    // buildReducers(builder, addRecipeToFav, (state, action) => {
    //   // Оновлюємо тільки потрібні поля
    //   if (action.payload) {
    //     state.favorites = {
    //       recipes: action.payload.recipes || state.favorites.recipes || [],
    //       page: action.payload.page || state.favorites.page || 1,
    //       totalItems:
    //         action.payload.totalItems || state.favorites.totalItems || 0,
    //     };
    //   }

    //   if (state.recipe) {
    //     state.recipe.isFavorite = true;
    //   }
    // });

    buildReducers(builder, removeRecipeFromFav, (state, action) => {
      state.favorites = action.payload;
      if (state.recipe) {
        state.recipe.isFavorite = false;
      }
    });

    // buildReducers(builder, removeRecipeFromFav, (state, action) => {
    //   state.favorites = {
    //     recipes: action.payload?.recipes || state.favorites.recipes || [],
    //     page: action.payload?.page || state.favorites.page || 1,
    //     totalItems:
    //       action.payload?.totalItems || state.favorites.totalItems || 0,
    //   };

    //   if (state.recipe) {
    //     state.recipe.isFavorite = false;
    //   }
    // });

    // buildReducers(builder, fetchFavorites, (state, action) => {
    //   state.favorites = action.payload;
    // });
    buildReducers(builder, fetchFavorites, (state, action) => {
      const { recipes, totalItems, page } = action.payload;

      if (page === 1) {
        state.favorites.recipes = recipes;
      } else {
        state.favorites.recipes = [...state.favorites.recipes, ...recipes];
      }
      state.favorites.page = page;
      state.favorites.totalItems = totalItems;
    });

    // buildReducers(builder, fetchOwnRecipes, (state, action) => {
    //   state.own = action.payload;
    // });

    buildReducers(builder, fetchOwnRecipes, (state, action) => {
      const { recipes, totalItems, page } = action.payload;

      if (page === 1) {
        state.own.recipes = recipes;
      } else {
        state.own.recipes = [...state.own.recipes, ...recipes];
      }

      state.own.page = page;
      state.own.totalItems = totalItems;
    });

    buildReducers(builder, removeOwnRecipes, (state, action) => {
      // state.own = state.own.filter((recipe) => recipe._id !== action.payload);
      state.own.recipes = state.own.recipes.filter(
        (recipe) => recipe._id !== action.payload
      );
      // to update totalItems
      if (typeof state.own.totalItems === "number") {
        state.own.totalItems = state.own.recipes.length;
      }
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
      if (state.recipe) {
        state.recipe.isFavorite = false;
      }
      state.recipe = null;
      // state.favorites = [];
      // state.own = [];
      state.favorites = {
        recipes: [],
        page: 1,
        totalItems: 0,
      };
      state.own = {
        recipes: [],
        page: 1,
        totalItems: 0,
      };
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
      state.items = [];
      state.favorites = {
        recipes: [],
        page: 1,
        totalItems: 0,
      };
      state.own = {
        recipes: [],
        page: 1,
        totalItems: 0,
      };
    });
}

export default slice.reducer;

export const { setDeleteRecipeId, setEditRecipeId } = slice.actions;
