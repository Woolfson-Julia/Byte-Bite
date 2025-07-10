import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./MyRecipesList.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import Loader from "../Loader/Loader";
import { fetchOwnRecipes } from "../../redux/recipes/operations";
import {
  selectOwnRecipes,
  selectRecipesLoading,
  selectRecipesError,
  selectOwnCount,
} from "../../redux/recipes/selectors";
import {
  selectCategory,
  selectIngredient,
} from "../../redux/filters/selectors.js";
import { genericErrorMessage } from "../../redux/recipes/operations";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export default function MyRecipes() {
  const dispatch = useDispatch();
  const ownRecipes = useSelector(selectOwnRecipes);
  const isLoading = useSelector(selectRecipesLoading);
  const error = useSelector(selectRecipesError);
  const categoryValue = useSelector(selectCategory);
  const ingredientValue = useSelector(selectIngredient);
  const ownTotal = useSelector(selectOwnCount);
  const hasMore = ownRecipes.length < ownTotal;

  const [page, setPage] = useState(1);
  const prevLengthRef = useRef(0);
  //const cardRef = useRef(null);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(
      fetchOwnRecipes({
        category: categoryValue,
        ingredient: ingredientValue,
        page: page,
      })
    );
  }, [dispatch, categoryValue, ingredientValue, page]);

  // useEffect(() => {
  //   if (
  //     page > 1 &&
  //     ownRecipes.length > prevLengthRef.current &&
  //     cardRef.current
  //   ) {
  //     const cardHeight = cardRef.current.getBoundingClientRect().height;
  //     window.scrollBy({
  //       top: cardHeight,
  //       behavior: "smooth",
  //     });
  //   }

  //   prevLengthRef.current = ownRecipes.length;
  // }, [ownRecipes, page]);

  const newItemRef = useRef(null);

  useEffect(() => {
    if (
      page > 1 &&
      ownRecipes.length > prevLengthRef.current &&
      newItemRef.current
    ) {
      newItemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    prevLengthRef.current = ownRecipes.length;
  }, [ownRecipes, page]);

  return (
    <>
      {!isLoading && error && <p>{genericErrorMessage}</p>}
      {!isLoading && !error && (
        <ul className={css.list}>
          {ownRecipes.map((recipe, index) => {
            const isFirstNew = page > 1 && index === prevLengthRef.current;
            return (
              <li key={recipe._id} ref={isFirstNew ? newItemRef : null}>
                <RecipeCard
                  recipe={recipe}
                  showFavoriteButton={false}
                  showRemoveButton={true}
                />
              </li>
            );
          })}
        </ul>
      )}
      {isLoading && <Loader />}
      {hasMore && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
}
