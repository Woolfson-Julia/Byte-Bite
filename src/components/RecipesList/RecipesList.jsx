import { useSelector } from "react-redux";
import css from "./RecipesList.module.css";
import {
  selectRecipesError,
  selectRecipes,
  selectRecipesLoading,
} from "../../redux/recipes/selectors";
import { genericErrorMessage } from "../../redux/recipes/operations";
import RecipeCard from "../RecipeCard/RecipeCard";

function RecipesList() {
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);

  return (
    <>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>{genericErrorMessage}</p>}
      {!isLoading && !error && recipes.length > 0 && (
        <ul className={css.list}>
          {recipes.map((recipe) => {
            return (
              <li key={recipe.id}>
                <RecipeCard data={recipe} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default RecipesList;
