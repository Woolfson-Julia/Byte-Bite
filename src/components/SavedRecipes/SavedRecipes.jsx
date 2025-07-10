import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import css from "./SavedRecipes.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import Loader from "../Loader/Loader";
import { fetchFavorites } from "../../redux/recipes/operations";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import {
  selectFavorites,
  selectRecipesLoading,
  selectRecipesError,
  selectFavoritesCount,
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
  const favoritesCount = useSelector(selectFavoritesCount);
  const categoryValue = useSelector(selectCategory);
  const ingredientValue = useSelector(selectIngredient);

  const hasMore = favorites.length < favoritesCount;

  const [page, setPage] = useState(1);
  const prevLengthRef = useRef(0);
  // const cardRef = useRef(null);

  useEffect(() => {
    dispatch(
      fetchFavorites({
        page: page,
        category: categoryValue,
        ingredient: ingredientValue,
      })
    );
  }, [dispatch, categoryValue, ingredientValue, page]);

  // useEffect(() => {
  //   if (
  //     page > 1 &&
  //     favorites.length > prevLengthRef.current &&
  //     cardRef.current
  //   ) {
  //     const cardHeight = cardRef.current.getBoundingClientRect().height;
  //     window.scrollBy({
  //       top: cardHeight,
  //       behavior: "smooth",
  //     });
  //   }

  //   prevLengthRef.current = favorites.length;
  // }, [favorites, page]);

  const newItemRef = useRef(null);

  useEffect(() => {
    if (
      page > 1 &&
      favorites.length > prevLengthRef.current &&
      newItemRef.current
    ) {
      newItemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    prevLengthRef.current = favorites.length;
  }, [favorites, page]);

  return (
    <>
      {!isLoading && error && <p>{genericErrorMessage}</p>}
      {!isLoading && !error && (
        <ul className={css.list}>
          {favorites.map((recipe, index) => {
            const isFirstNew = page > 1 && index === prevLengthRef.current;
            return (
              <li key={recipe._id} ref={isFirstNew ? newItemRef : null}>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={true}
                  showFavoriteButton={true}
                  showRemoveButton={false}
                />
              </li>
            );
          })}
        </ul>
      )}

      {isLoading && <Loader />}

      {!isLoading && !error && hasMore && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}
    </>
  );
}
