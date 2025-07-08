import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import css from "./SavedRecipes.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import Loader from "../Loader/Loader";
import { fetchFavorites } from "../../redux/recipes/operations";
import {
  selectFavorites,
  selectRecipesLoading,
  selectRecipesError,
} from "../../redux/recipes/selectors";
import {
  selectCategory,
  selectIngredient,
} from "../../redux/filters/selectors.js";
import { genericErrorMessage } from "../../redux/recipes/operations";

export default function SavedRecipes() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isLoading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);
  const categoryValue = useSelector(selectCategory);
  const ingredientValue = useSelector(selectIngredient);

  // useEffect(() => {
  //   dispatch(fetchFavorites());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(
      fetchFavorites({
        category: categoryValue,
        ingredient: ingredientValue,
      })
    );
  }, [dispatch, categoryValue, ingredientValue]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{genericErrorMessage}</p>}
      {!isLoading && !error && (
        <ul className={css.list}>
          {favorites.map((recipe) => (
            <li key={recipe._id}>
              <RecipeCard
                recipe={recipe}
                isFavorite={true}
                showFavoriteButton={true}
                showRemoveButton={false}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
