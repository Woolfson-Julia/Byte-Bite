import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./RecipesList.module.css";

import {
  selectRecipesError,
  selectRecipes,
  selectRecipesLoading,
  selectFavorites,
  selectRecipesCount,
} from "../../redux/recipes/selectors";
import { genericErrorMessage } from "../../redux/recipes/operations";
import RecipeCard from "../RecipeCard/RecipeCard";
import {
  fetchRecipesWithFilters,
  fetchFavorites,
} from "../../redux/recipes/operations.js";

import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";

import {
  selectFilter,
  selectCategory,
  selectIngredient,
} from "../../redux/filters/selectors.js";

import { selectIsLoggedIn } from "../../redux/auth/selectors";

function RecipesList() {
  const dispatch = useDispatch();

  const searchValue = useSelector(selectFilter);
  const categoryValue = useSelector(selectCategory);
  const ingredientValue = useSelector(selectIngredient);
  const recipes = useSelector(selectRecipes);
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const recipesCount = useSelector(selectRecipesCount);
  const hasMore = recipesCount > recipes.length;

  const [page, setPage] = useState(1);

  const prevLengthRef = useRef(0);
  const cardRef = useRef(null);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setPage((prev) => (prev !== 1 ? 1 : prev));
  }, [searchValue, categoryValue, ingredientValue, isLoggedIn]);

  useEffect(() => {
    dispatch(
      fetchRecipesWithFilters({
        title: searchValue,
        category: categoryValue,
        ingredient: ingredientValue,
        page,
      })
    );

    if (isLoggedIn) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, searchValue, categoryValue, ingredientValue, isLoggedIn, page]);

  // Автоскролл при добавлении новых рецептов
  useEffect(() => {
    if (page > 1 && recipes.length > prevLengthRef.current && cardRef.current) {
      const cardHeight = cardRef.current.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight,
        behavior: "smooth",
      });
    }

    prevLengthRef.current = recipes.length;
  }, [recipes, page]);

  return (
    <>
      <div>
        {error && <p>{genericErrorMessage}</p>}
        {!error && recipes.length > 0 && (
          <ul className={css.list}>
            {recipes.map((recipe, index) => (
              <li key={recipe._id} ref={index === 0 ? cardRef : null}>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={favorites.some((fav) => fav._id === recipe._id)}
                  showRemoveButton={false}
                />
              </li>
            ))}
          </ul>
        )}
        {isLoading && <Loader />}
        {!isLoading && hasMore && !error && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </div>
    </>
  );
}

export default RecipesList;
