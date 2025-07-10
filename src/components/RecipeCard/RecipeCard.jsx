import css from "./RecipeCard.module.css";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  addRecipeToFav,
  fetchFavorites,
  removeRecipeFromFav,
  removeOwnRecipes
} from "../../redux/recipes/operations";

import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { openModal } from "../../redux/modal/slice";
import toast from "react-hot-toast";
import ToastInfo from "../ToastInfo/ToastInfo";





export default function RecipeCard({ recipe, isFavorite, showFavoriteButton = true, showRemoveButton=true}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleBtnMore = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleAddToFavorites = async (id, e) => {
    e.currentTarget.blur(); // 👈 Убираем фокус с кнопки

    if (!isLoggedIn) {
      dispatch(openModal({ modalType: "not-auth" }));
      return;
    }
    try {
      await dispatch(addRecipeToFav(id)).unwrap();    
      // dispatch(openModal({ modalType: "saved" }));
      dispatch(fetchFavorites());
      toast.success("Recipe added to favorites!");
    } catch (error) {
      console.error("Ошибка при добавлении в избранное", error);
    }
  };

  const handleRemoveFromFavorites = async (id, e) => {
    e.currentTarget.blur(); // 👈 Убираем фокус с кнопки

    try {
      await dispatch(removeRecipeFromFav(id)).unwrap();
      dispatch(fetchFavorites());
      toast.success("Recipe delete from favorites!");
    } catch (error) {
      console.error("Ошибка при удалении из избранного", error);
    }
  };

  const deleteOwnRecipes = async (id) => {
    try {
      await dispatch(removeOwnRecipes(id)).unwrap();
    } catch (error) {
      console.error("Ошибка при удалении", error);
    }
  };

  return (
    <div className={css.recipe}>
      <img src={recipe.thumb} alt={recipe.title} />
      <div className={css.tittleBox}>
        <h3 className={css.recipeTittle}>{recipe.title}</h3>
        <div className={css.time}>
          <svg width="24" height="24" stroke="currentColor">
            <use href="/sprite.svg#icon-timeclock-24px" />
          </svg>
          {recipe.time}
        </div>
      </div>
      <p className={css.desc}>{recipe.description}</p>
      <p className={css.cals}>~{recipe.cals} cals</p>

      <div className={css.buttonBox} style={{ display: "flex" }}>
        <Button
          className={css.button}
          variant="lightButton"
          type="button"
          onClick={(e) => handleBtnMore(recipe._id, e)}
        >
          Learn More
        </Button>
        <div className={css.wrapperCount}>
          {showFavoriteButton &&
            (isFavorite ? (
              <IconButton
                className={css.buttonSvg}
                variantBtn="darkButtonSvg"
                variantSvg="lightSvg"
                type="button"
                onClick={(e) => handleRemoveFromFavorites(recipe._id, e)}
              >
                <svg width="24" height="24" stroke="currentColor">
                  <use href="/sprite.svg#icon-add-to-favorite-24px" />
                </svg>
              </IconButton>
            ) : (
              <IconButton
                className={css.buttonSvg}
                variantBtn="lightButtonSvg"
                variantSvg="darkSvg"
                type="button"
                onClick={(e) => handleAddToFavorites(recipe._id, e)}
              >
                <svg width="24" height="24" stroke="currentColor">
                  <use href="/sprite.svg#icon-add-to-favorite-24px" />
                </svg>
              </IconButton>
            ))}
          <div className={css.favoritesCount}>
            <svg width="24" height="24" stroke="currentColor">
              <use href="/sprite.svg#icon-add-to-favorite-24px" />
            </svg>
            <p className={css.f}>{recipe.favoritesCount || 0}</p>
          </div>
        </div>
        {showRemoveButton && (
          <IconButton
            className={css.removeBtn}
            variantBtn="removeBtn"
            variantSvg="removeBtn"
            type="button"
            onClick={(e) => deleteOwnRecipes(recipe._id, e)}
          >
            <svg width="24" height="24" stroke="white">
              <use href="/sprite.svg#icon-delete-24px" />
            </svg>
          </IconButton>
        )}
        <ToastInfo />
      </div>
    </div>
  );
}