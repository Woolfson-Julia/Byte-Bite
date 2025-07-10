import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axiosConfig";

export const genericErrorMessage =
  "There was an error. Try to update page a bit later";

export const fetchRecipes = generateThunk("recipes/fetchRecipes", () => {
  return axios.get("/recipes");
});

export const addRecipe = generateThunk("recipes/addRecipe", (formData) => {
  return axios.post("/recipes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
});

export const fetchRecipeById = generateThunk("recipes/fetchById", (id) =>
  axios.get(`/recipes/${id}`)
);

function generateThunk(name, requestFunc) {
  return createAsyncThunk(name, async (arg, thunkAPI) => {
    try {
      const response = await requestFunc(arg);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        // error
        error.response?.data?.message || error.message || genericErrorMessage
      );
    }
  });
}

export const fetchRecipesWithFilters = generateThunk(
  "recipes/fetchRecipesWithFilters",
  (filters = {}) => {
    return axios.get("/recipes", { params: filters });
  }
);

export const addRecipeToFav = createAsyncThunk(
  "recipes/addToFav",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axios.post(`/recipes/profile/favorites`, {
        recipeId,
      });
      // return response.data.data.recipes;
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || genericErrorMessage
      );
    }
  }
);

export const removeRecipeFromFav = createAsyncThunk(
  "recipes/removeFromFav",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `recipes/profile/favorites/${recipeId}`
      );
      // return response.data.data.recipes;
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || genericErrorMessage
      );
    }
  }
);

// export const fetchFavorites = createAsyncThunk(
//   "recipes/fetchFavorites",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("/recipes/profile/favorites");
//       return response.data.data.recipes;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );
// export const fetchFavorites = createAsyncThunk(
//   "recipes/fetchFavorites",
//   async (filters = {}, thunkAPI) => {
//     try {
//       const response = await axios.get("/recipes/profile/favorites", {
//         params: filters,
//       });
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// export const fetchOwnRecipes = createAsyncThunk(
//   "recipes/fetchOwnRecipes",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("/recipes/profile/own");
//       return response.data.data.recipes;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

export const fetchFavorites = createAsyncThunk(
  "recipes/fetchFavorites",
  async ({ page, ...filters } = {}, thunkAPI) => {
    try {
      const response = await axios.get("/recipes/profile/favorites", {
        params: { page, ...filters },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwnRecipes",
  async ({ page, ...filters } = {}, thunkAPI) => {
    try {
      const response = await axios.get("/recipes/profile/own", {
        params: { page, ...filters },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const removeOwnRecipes = createAsyncThunk(
  "recipes/removeOwnRecipes",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/recipes/profile/own/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
