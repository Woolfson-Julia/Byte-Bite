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
import { selectFavorites } from "../../redux/recipes/selectors";

import { useState, useEffect } from "react";

export default function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavorites);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (Array.isArray(favorites)) {
      setIsFavorite(favorites.includes(recipe._id));
    }
  }, [favorites, recipe._id]);

  const handleBtnMore = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleAddToFavorites = async (id) => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }

    try {
      await dispatch(addRecipeToFav(id)).unwrap();
      setIsFavorite(true);
    } catch (error) {
      console.error("Ошибка при добавлении в избранное", error);
    }
  };

  const handleRemoveFromFavorites = async (id) => {
    try {
      await dispatch(removeRecipeFromFav(id)).unwrap();
      setIsFavorite(false);
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
      <p className={css.cals}>~{recipe.cals}cals</p>

      <div className={css.buttonBox}>
        <Button
          className={css.button}
          type="button"
          onClick={() => handleBtnMore(recipe._id)}
        >
          Learn More
        </Button>

        {isFavorite ? (
          <IconButton
            className={`${css.buttonSvg} ${css.removeBtn}`}
            type="button"
            variantBtn="removeBtn"
            onClick={() => handleRemoveFromFavorites(recipe._id)}
          >
            <svg width="24" height="24" stroke="white">
              <use href="/sprite.svg#icon-delete-24px" />
            </svg>
          </IconButton>
        ) : (
          <IconButton
              className={`${css.buttonSvg} ${css.addBtn}`}
              variantBtn="lightButtonSvg"
              variantSvg="lightButtonSvg"
            type="button"
            onClick={() => handleAddToFavorites(recipe._id)}
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

