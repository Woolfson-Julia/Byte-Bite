import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategoryFilter,
  changeIngredientFilter,
} from "../../redux/filters/slice";
import { fetchRecipesWithFilters } from "../../redux/recipes/operations";
import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations";
import {
  selectCategories,
  selectIngredients,
  selectCategory,
  selectIngredient,
  selectFilter,
} from "../../redux/filters/selectors";
import { selectRecipesCount } from "../../redux/recipes/selectors.js";
import IconButton from "../IconButton/IconButton";
import { useIsMobileOrTablet } from "./useIsMobileOrTablet.js";
import css from "./Filters.module.css";

export default function Filter() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobileOrTablet = useIsMobileOrTablet();
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };
  const handleFiltersBtnClick = () => {
    setIsModalOpen(true);
  };
  const recipesCount = useSelector(selectRecipesCount);
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const category = useSelector(selectCategory);
  const ingredient = useSelector(selectIngredient);
  const title = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchRecipesWithFilters({ category, ingredient, title }));
  }, [category, ingredient, title, dispatch]);

  const handleResetClick = (e) => {
    e.preventDefault();
    dispatch(changeCategoryFilter(""));
    dispatch(changeIngredientFilter(""));
    // dispatch(fetchRecipesWithFilters({ category: "", ingredient: "" }));
  };
  const handleCategoryChange = (e) => {
    const filterValue = e.target.value;
    dispatch(changeCategoryFilter(filterValue));
    // dispatch(fetchRecipesWithFilters({ category, ingredient }));
  };
  const handleIngredientChange = (e) => {
    const filterValue = e.target.value;
    dispatch(changeIngredientFilter(filterValue));
    // dispatch(fetchRecipesWithFilters({ category, ingredient }));
  };

  return (
    <>
      <div className="filtersContainer.section">
        <div className={css.filtersRow}>
          <span className={css.filtersCount}>
            {recipesCount}
            {recipesCount === 1 ? " recipe" : " recipes"}
          </span>
          {!isMobileOrTablet && (
            <div className="filtersInputsWrapper">
              <form className="filtersForm">
                <button
                  className="filtersResetBtn"
                  type="reset"
                  onClick={handleResetClick}
                >
                  Reset filters
                </button>
                <select
                  className="filtersInputCategory"
                  name="category"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option key="all-categories" value="">
                    Category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select
                  className="filtersInputIngredient"
                  name="ingredient"
                  value={ingredient}
                  onChange={handleIngredientChange}
                >
                  <option key="all-ingredients" value="">
                    Ingredient
                  </option>
                  {ingredients.map((ingredient) => (
                    <option key={ingredient._id} value={ingredient._id}>
                      {ingredient.name}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          )}
          <IconButton
            className="filtersModalOpenBtn"
            aria-label="Open filters"
            onClick={handleFiltersBtnClick}
          >
            <span className="filtersModalOpenBtnTxt">Filters</span>
            <svg width="24" height="24">
              <use xlinkHref="/sprite.svg#icon-filter-24px" />
            </svg>
          </IconButton>
          {isMobileOrTablet && isModalOpen && (
            <div
              className={css.filtersModalOverlay}
              onClick={handleOverlayClick}
              role="dialog"
              aria-modal="true"
            >
              <div className={css.filtersModal}>
                <form className={css.filtersModalForm}>
                  <label>
                    Category
                    <select
                      className="filtersModalCategory"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <option key="modal-all-categories" value="">
                        Category
                      </option>
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Ingredient
                    <select
                      className="filtersModalInputIngredient"
                      value={ingredient}
                      onChange={handleIngredientChange}
                    >
                      <option key="all-ingredients" value="">
                        Ingredient
                      </option>
                      {ingredients.map((ingredient) => (
                        <option key={ingredient._id} value={ingredient._id}>
                          {ingredient.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    className="filtersModalResetBtn"
                    type="button"
                    onClick={handleResetClick}
                  >
                    Reset filters
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
