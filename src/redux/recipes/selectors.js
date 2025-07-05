export const selectRecipes = (state) => state.recipes.items;

export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;

export const selectRecipesLoading = (state) => state.recipes.loading;

export const selectRecipesError = (state) => state.recipes.error;

export const selectFavorites = (state) => state.recipes.favorites || [];
