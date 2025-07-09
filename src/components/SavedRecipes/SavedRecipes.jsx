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
import { genericErrorMessage } from "../../redux/recipes/operations";

export default function SavedRecipes() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);
  const favoritesCount = useSelector(selectFavoritesCount);

  const hasMore = favorites.length < favoritesCount;

  const [page, setPage] = useState(1);
  const prevLengthRef = useRef(0);
  const cardRef = useRef(null);


  useEffect(() => {
    dispatch(fetchFavorites({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (
      page > 1 &&
      favorites.length > prevLengthRef.current &&
      cardRef.current
    ) {
      const cardHeight = cardRef.current.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight,
        behavior: "smooth",
      });
    }

    prevLengthRef.current = favorites.length;
  }, [favorites, page]);

  return (
    <>
      {error && <p>{genericErrorMessage}</p>}

      {!error && (
        <ul className={css.list}>
          {favorites.map((recipe, index) => (
            <li
              key={recipe._id}
              ref={index === 0 ? cardRef : null} 
            >
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

      {isLoading && <Loader />}

      {!isLoading && !error && hasMore && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}
    </>
  );
}
