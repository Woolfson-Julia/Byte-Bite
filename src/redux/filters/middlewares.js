import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchCategories, fetchIngredients } from "./operations";
import toast from "react-hot-toast";

const filtersListenerMiddleware = createListenerMiddleware();

filtersListenerMiddleware.startListening({
  actionCreator: fetchCategories.rejected,
  effect: async () => {
    toast.error("Failed to load categories");
  },
});

filtersListenerMiddleware.startListening({
  actionCreator: fetchIngredients.rejected,
  effect: async () => {
    toast.error("Failed to load ingredients");
  },
});

export default filtersListenerMiddleware;
