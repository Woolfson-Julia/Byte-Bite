import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./RecipesList.module.css";
import {
  selectRecipesError,
  selectRecipes,
  selectRecipesLoading,
  selectFavorites,          
} from "../../redux/recipes/selectors";
import { genericErrorMessage } from "../../redux/recipes/operations";
import RecipeCard from "../RecipeCard/RecipeCard";
import { fetchRecipesWithFilters, fetchFavorites } from "../../redux/recipes/operations.js"; 
import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import { selectFilter } from "../../redux/filters/selectors.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors"; 

function RecipesList() {
  const dispatch = useDispatch();

  const searchValue = useSelector(selectFilter);
  const recipes = useSelector(selectRecipes);
  const favorites = useSelector(selectFavorites);  
  const isLoading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchRecipesWithFilters({ title: searchValue }));

    if (isLoggedIn) {
      dispatch(fetchFavorites()); 
    }
  }, [dispatch, searchValue, isLoggedIn]);

  return (
    <>
      <div className="section">
      <div className="container">
        <h2 className={css.tittle}>
          {searchValue ? `Search results for "${searchValue}"` : 'Recepies'}
        </h2>

        {isLoading && <Loader />}
        {error && <p>{genericErrorMessage}</p>}
        {!isLoading && !error && recipes.length > 0 && (
          <ul className={css.list}>
            {recipes.map((recipe) => (
              <li key={recipe._id}>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={favorites.some(fav => fav._id === recipe._id)}
                />
              </li>
            ))}
          </ul>
        )}

        <LoadMoreBtn />
      </div>
      </div>
      
    </>
  );
}

export default RecipesList;
