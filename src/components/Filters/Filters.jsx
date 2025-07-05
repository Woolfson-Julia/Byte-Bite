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

  const handleResetClick = () => {
    //e.preventDefault();
    dispatch(changeCategoryFilter(""));
    dispatch(changeIngredientFilter(""));
  };
  const handleCategoryChange = (e) => {
    const filterValue = e.target.value;
    dispatch(changeCategoryFilter(filterValue));
  };
  const handleIngredientChange = (e) => {
    const filterValue = e.target.value;
    dispatch(changeIngredientFilter(filterValue));
  };

  return (
    <>
      <div className={`${css.filtersContainer} section`}>
        <div className={css.filtersRow}>
          <span className={css.filtersCount}>
            {recipesCount}
            {recipesCount === 1 ? " recipe" : " recipes"}
          </span>
          {!isMobileOrTablet && (
            <div className="filtersInputsWrapper">
              <form className={css.filtersForm}>
                <button
                  className={css.filtersResetBtn}
                  type="button"
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
                  <option key="all-categories" value="" disabled>
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
                  <option key="all-ingredients" value="" disabled>
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
          {isMobileOrTablet && (
            <IconButton
              className={css.filtersModalOpenBtn}
              aria-label="Open filters"
              onClick={handleFiltersBtnClick}
            >
              <span className={css.filtersModalOpenBtnTxt}>Filters</span>
              <svg
                className={css.filtersModalOpenBtnSvg}
                width="24"
                height="24"
              >
                <use xlinkHref="/sprite.svg#icon-filter-24px" />
              </svg>
            </IconButton>
          )}
          {/* Modal for mobile and tablet devices */}
          {isMobileOrTablet && isModalOpen && (
            <div
              className={css.filtersModalOverlay}
              onClick={handleOverlayClick}
              role="dialog"
              aria-modal="true"
            >
              <div className={css.filtersModal}>
                <div className={css.filtersModalHeader}>
                  <span>Filters</span>
                  <button
                    className={css.filtersModalResetBtn}
                    type="button"
                    onClick={() => {
                      handleResetClick();
                      setIsModalOpen(false);
                    }}
                  >
                    Reset filters
                  </button>
                </div>
                <form className={css.filtersModalForm}>
                  <label>
                    Category
                    <select
                      className="filtersModalCategory"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <option key="modal-all-categories" value="" disabled>
                        e.g. Soup
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
                      <option key="all-ingredients" value="" disabled>
                        e.g. Broccoli
                      </option>
                      {ingredients.map((ingredient) => (
                        <option key={ingredient._id} value={ingredient._id}>
                          {ingredient.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
