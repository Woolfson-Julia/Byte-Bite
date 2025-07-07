// import { createSelector } from "@reduxjs/toolkit";
// import { selectRecipes } from "../recipes/selectors";

export const selectFilter = (state) => state.filters.recipe;

// export const selectFilteredRecipes = createSelector(
//   [selectRecipes, selectFilter],
//   (recipes, filter) => {
//     const normalized = filter.toLowerCase().trim();
//     return recipes.filter((recipe) =>
//       recipe.title.toLowerCase().includes(normalized)
//     );
//   }
// );

export const selectCategory = (state) => state.filters.category;
export const selectIngredient = (state) => state.filters.ingredient;
export const selectCategories = (state) => state.filters.categories;
export const selectIngredients = (state) => state.filters.ingredients;
