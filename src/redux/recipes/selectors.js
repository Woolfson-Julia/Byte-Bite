import { createSelector } from "@reduxjs/toolkit";

export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
export const selectRecipesLoading = (state) => state.recipes.loading;
export const selectRecipesError = (state) => state.recipes.error;

// export const selectFavorites = (state) => state.recipes.favorites || [];
// export const selectOwnRecipes = (state) => state.recipes.own || [];
export const selectFavorites = (state) => state.recipes.favorites.recipes || [];
export const selectOwnRecipes = (state) => state.recipes.own.recipes || [];

export const selectRecipesCount = (state) =>
  state.recipes.items.totalItems || 0;
export const selectRecipesCountByPage = (state, page) => {
  let response = 0;
  switch (page) {
    case "favorites":
      response = state.recipes.favorites.totalItems || 0;
      break;
    case "own":
      response = state.recipes.own.totalItems || 0;
      break;
    default:
      response = state.recipes.items.totalItems || 0;
      break;
  }
  return response;
};

export const selectRecipesItems = (state) => state.recipes.items;
export const selectRecipes = createSelector(
  [selectRecipesItems],
  (items) => items.recipes || []
);
