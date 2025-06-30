import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchRecipes, fetchRecipeById, addRecipe } from "./operations";
import toast from "react-hot-toast";

const recipeListenerMiddleware = createListenerMiddleware();

recipeListenerMiddleware.startListening({
  actionCreator: fetchRecipes.rejected,
  effect: async () => {
    toast.error("Failed to load the recipes");
  },
});

recipeListenerMiddleware.startListening({
  actionCreator: fetchRecipeById.rejected,
  effect: async () => {
    toast.error("Failed to load the recipe");
  },
});

recipeListenerMiddleware.startListening({
  actionCreator: addRecipe.fulfilled,
  effect: async () => {
    toast.success("Recipe successfully added");
  },
});

recipeListenerMiddleware.startListening({
  actionCreator: addRecipe.rejected,
  effect: async () => {
    toast.error("Failed to add the recipe");
  },
});

export default recipeListenerMiddleware;
