import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./MyRecipesList.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import Loader from "../Loader/Loader";
import { fetchOwnRecipes } from "../../redux/recipes/operations";
import {
  selectOwnRecipes,
  selectRecipesLoading,
  selectRecipesError,
} from "../../redux/recipes/selectors";
import { genericErrorMessage } from "../../redux/recipes/operations";
import {
  selectCategory,
  selectIngredient,
} from "../../redux/filters/selectors.js";

export default function MyRecipes() {
  const dispatch = useDispatch();
  const ownRecipes = useSelector(selectOwnRecipes);
  const isLoading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);
  const categoryValue = useSelector(selectCategory);
  const ingredientValue = useSelector(selectIngredient);

  // useEffect(() => {
  //   dispatch(fetchOwnRecipes());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchOwnRecipes({
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
          {ownRecipes.map((recipe) => (
            <li key={recipe._id}>
              <RecipeCard
                recipe={recipe}
                showFavoriteButton={false}
                showRemoveButton={true}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
