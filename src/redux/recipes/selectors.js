import { createSelector } from "@reduxjs/toolkit";

// export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
export const selectRecipesLoading = (state) => state.recipes.loading;
export const selectRecipesError = (state) => state.recipes.error;

// export const selectFavorites = (state) => state.recipes.favorites || [];
// export const selectOwnRecipes = (state) => state.recipes.own || [];

export const selectRecipesCount = (state) =>
  state.recipes.items.totalItems || 0;

export const selectRecipesItems = (state) => state.recipes.items;
export const selectRecipes = createSelector(
  [selectRecipesItems],
  (items) => items.recipes || []
);
export const selectCurrentRecipe = (state) => state.recipes.recipe;

export const selectFavoritesCount = (state) =>
  state.recipes.favorites.totalItems || 0;
export const selectOwnCount = (state) => state.recipes.own.totalItems || 0;

export const selectRecipesCountByPage = (state, page) => {
  let recipesCounter = 0;
  switch (page) {
    case "favorites":
      recipesCounter = state.recipes.favorites.totalItems || 0;
      break;
    case "own":
      recipesCounter = state.recipes.own.totalItems || 0;
      break;
    default:
      recipesCounter = state.recipes.items.totalItems || 0;
      break;
  }
  return recipesCounter;
};

export const selectOwnRoot = (state) => state.recipes.own;
export const selectFavoritesRoot = (state) => state.recipes.favorites;

export const selectOwnRecipes = createSelector(
  [selectOwnRoot],
  (own) => own.recipes || []
);

export const selectFavorites = createSelector(
  [selectFavoritesRoot],
  (favorites) => favorites.recipes || []
);
