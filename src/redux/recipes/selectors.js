export const selectRecipes = (state) => state.recipes.items;

export const selectCurrentRecipe = (state) => state.recipes.recipe;
export const selectRecipesLoading = (state) => state.recipes.loading;
export const selectRecipesError = (state) => state.recipes.error;