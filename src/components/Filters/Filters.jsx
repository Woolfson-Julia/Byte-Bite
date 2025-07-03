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
} from "../../redux/filters/selectors";
import { selectRecipesCount } from "../../redux/recipes/selectors.js";
import IconButton from "../IconButton/IconButton";

// import css from "./Filters.module.css";

export default function Filter() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };
  const recipesCount = useSelector(selectRecipesCount);
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const category = useSelector(selectCategory);
  const ingredient = useSelector(selectIngredient);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchRecipesWithFilters({ category, ingredient }));
  }, [category, ingredient, dispatch]);

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
      <div className="filters-container">
        <div className="filters-row">
          <span className="filters__count">{recipesCount}</span>
          <div className="filters-inputs-container">
            <form className="filters-form">
              <button type="reset" onClick={handleResetClick}>
                Reset filters
              </button>
              <select
                className="filters-input-category"
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
                className="filters-input-ingredient"
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
          <button>Filter</button>
          <IconButton
            className="filters-modal-open-btn"
            aria-label="Open filters"
            onClick={() => setIsModalOpen(true)}
          >
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-filter-24px" />
            </svg>
          </IconButton>
          {isModalOpen && (
            <div
              className="filters-modal-overlay"
              onClick={handleOverlayClick}
              role="dialog"
              aria-modal="true"
            >
              <div className="filters-modal">
                <button
                  className="filters-modal-close-btn"
                  aria-label="Close filters"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="black"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <form className="filters-modal-form">
                  <label>
                    Category
                    <select
                      className="filters-modal-category"
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
                      className="filters-modal-input-ingredient"
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
                    className="filters-modal-reset-btn"
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
