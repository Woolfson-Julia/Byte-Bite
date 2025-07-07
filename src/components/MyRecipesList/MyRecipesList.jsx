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

export default function MyRecipes() {
  const dispatch = useDispatch();
  const ownRecipes = useSelector(selectOwnRecipes);
  const isLoading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);

  useEffect(() => {
    dispatch(fetchOwnRecipes());
  }, [dispatch]);

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
