import { createSelector } from "@reduxjs/toolkit";

// export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
export const selectRecipesLoading = (state) => state.recipes.loading;
export const selectRecipesError = (state) => state.recipes.error;

export const selectFavorites = (state) => state.recipes.favorites || [];
export const selectOwnRecipes = (state) => state.recipes.own || [];

export const selectRecipesCount = (state) =>
  state.recipes.items.totalItems || 0;

export const selectRecipesItems = (state) => state.recipes.items;
export const selectRecipes = createSelector(
  [selectRecipesItems],
  (items) => items.recipes || []
);
export const selectCurrentRecipe = (state) => state.recipes.recipe;
export const selectFavoritesCount = (state) => state.recipes.favoritesTotalItems;
export const selectOwnCount = (state) => state.recipes.ownTotalItems;

