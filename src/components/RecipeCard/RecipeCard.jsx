import css from "./RecipeCard.module.css";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  addRecipeToFav,
  removeRecipeFromFav,
} from "../../redux/recipes/operations";

import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function RecipeCard({ recipe, isFavorite }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleBtnMore = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleAddToFavorites = async (id, e) => {
    e.currentTarget.blur(); // 👈 Убираем фокус с кнопки

    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
    try {
      await dispatch(addRecipeToFav(id)).unwrap();
      dispatch(fetchFavorites());
    } catch (error) {
      console.error("Ошибка при добавлении в избранное", error);
    }
  };

  const handleRemoveFromFavorites = async (id, e) => {
    e.currentTarget.blur(); // 👈 Убираем фокус с кнопки

    try {
      await dispatch(removeRecipeFromFav(id)).unwrap();
      dispatch(fetchFavorites());
    } catch (error) {
      console.error("Ошибка при удалении из избранного", error);
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

      <div className={css.buttonBox}>
        <Button
          className={css.button}
          variant="lightButton"
          type="button"
          onClick={() => handleBtnMore(recipe._id)}
        >
          Learn More
        </Button>

        {isFavorite ? (
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
        )}
      </div>
    </div>
  );
}
