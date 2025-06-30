import { createSelector } from '@reduxjs/toolkit';
import { selectRecipes } from '../recipes/selectors'; 

export const selectFilter = (state) => state.filters.recipe;

export const selectFilteredRecipes = createSelector(
  [selectRecipes, selectFilter],
  (recipes, filter) => {
    const normalized = filter.toLowerCase().trim();
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(normalized)
    );
  }
);
