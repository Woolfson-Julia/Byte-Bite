import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategoryFilter,
  changeIngredientFilter,
} from "../../redux/filters/slice";
// import { fetchRecipesWithFilters } from "../../redux/recipes/operations";
import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations";
import {
  selectCategories,
  selectIngredients,
  selectCategory,
  selectIngredient,
  // selectFilter,
} from "../../redux/filters/selectors";
import {
  // selectRecipesCount,
  selectRecipesCountByPage,
} from "../../redux/recipes/selectors.js";
import IconButton from "../IconButton/IconButton";
import { useIsMobileOrTablet } from "./useIsMobileOrTablet.js";
import css from "./Filters.module.css";
import ToastInfo from "../ToastInfo/ToastInfo.jsx";

export default function Filter() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobileOrTablet = useIsMobileOrTablet();
  useEffect(() => {
    if (!isModalOpen) return;
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };
  const handleFiltersBtnClick = () => {
    setIsModalOpen(true);
  };

  const location = useLocation();

  let page = "main";
  if (location.pathname.includes("favorites")) page = "favorites";
  if (location.pathname.includes("own")) page = "own";

  const recipesCount = useSelector((state) =>
    selectRecipesCountByPage(state, page)
  );
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const category = useSelector(selectCategory);
  const ingredient = useSelector(selectIngredient);
  // const title = useSelector(selectFilter);
  // const recipesCount = useSelector(selectRecipesCount);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchRecipesWithFilters({ category, ingredient, title }));
  // }, [category, ingredient, title, dispatch]);

  const handleResetClick = () => {
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
      <div className={`${css.filtersContainer}`}>
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
                  className={css.filtersInputCategory}
                  name="category"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option key="exp-categories" value="" disabled>
                    Category
                  </option>
                  <option key="all-categories" value="">
                    All
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select
                  className={css.filtersInputIngredient}
                  name="ingredient"
                  value={ingredient}
                  onChange={handleIngredientChange}
                >
                  <option key="exp-ingredients" value="" disabled>
                    Ingredient
                  </option>
                  <option key="all-ingredients" value="">
                    All
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
                      <option key="modal-exp-categories" value="" disabled>
                        e.g. Soup
                      </option>
                      <option key="modal-all-categories" value="">
                        All
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
                      <option key="modal-exp-ingredients" value="" disabled>
                        e.g. Broccoli
                      </option>
                      <option key="modal-all-ingredients" value="">
                        All
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
      <ToastInfo />
    </>
  );
}
