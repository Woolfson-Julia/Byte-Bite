import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./RecipesList.module.css";
import {
  selectRecipesError,
  selectRecipes,
  selectRecipesLoading,
} from "../../redux/recipes/selectors";
import { genericErrorMessage } from "../../redux/recipes/operations";
import RecipeCard from "../RecipeCard/RecipeCard";
import { fetchRecipesWithFilters } from "../../redux/recipes/operations.js";
import Loader from "../Loader/Loader.jsx"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx"
import { selectFilter } from "../../redux/filters/selectors.js"

function RecipesList() {
  const dispatch = useDispatch();

  const searchValue = useSelector(selectFilter)
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);

  useEffect(() => {
    
      dispatch(fetchRecipesWithFilters({ title: searchValue }));
    
  }, [dispatch, searchValue]);
  

  return (
    <>
      <div className={css.container}>
        <h2 className={css.tittle}>
          {searchValue ? `Search results for "${searchValue}"` : 'Recepies'}
        </h2>

      {isLoading && <Loader/>}
      {error && <p>{genericErrorMessage}</p>}
      {!isLoading && !error && recipes.length > 0 && (
        <ul className={css.list}>
          {recipes.map((recipe) => {
            return (
              <li key={recipe._id}>
                <RecipeCard recipe={recipe} />
              </li>
            );
          })}
        </ul>
        )}
        
        <LoadMoreBtn/>
        
      </div>
      
    </>
  );
}

export default RecipesList;
