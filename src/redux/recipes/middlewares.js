import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipeById,
  addRecipe,
  fetchRecipesWithFilters,
} from "./operations";
import toast from "react-hot-toast";

const recipesListenerMiddleware = createListenerMiddleware();

recipesListenerMiddleware.startListening({
  actionCreator: fetchRecipes.rejected,
  effect: async () => {
    toast.error("Failed to load the recipes");
  },
});

recipesListenerMiddleware.startListening({
  actionCreator: fetchRecipeById.rejected,
  effect: async () => {
    toast.error("Failed to load the recipe");
  },
});

recipesListenerMiddleware.startListening({
  actionCreator: addRecipe.fulfilled,
  effect: async () => {
    toast.success("Recipe successfully added");
  },
});

recipesListenerMiddleware.startListening({
  actionCreator: addRecipe.rejected,
  effect: async () => {
    toast.error("Failed to add the recipe");
  },
});

recipesListenerMiddleware.startListening({
  actionCreator: fetchRecipesWithFilters.rejected,
  effect: async () => {
    console.log("REJECTED!");
    toast.error("Failed to load the recipes with such filters");
  },
});

export default recipesListenerMiddleware;
