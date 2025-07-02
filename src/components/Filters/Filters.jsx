import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategoryFilter,
  changeIngredientFilter,
} from "../../redux/filters/slice";
import { fetchRecipes } from "../../redux/recipes/operations";
import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations";
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
  const categories = useSelector((state) => state.filters.categories);
  const ingredients = useSelector((state) => state.filters.ingredients);
  const category = useSelector((state) => state.filters.category);
  const ingredient = useSelector((state) => state.filters.ingredient);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleResetClick = (e) => {
    e.preventDefault();
    dispatch(changeCategoryFilter(""));
    dispatch(changeIngredientFilter(""));
    dispatch(fetchRecipes());
  };
  const handleCategoryChange = (e) => {
    const filterValue = e.target.value;
    dispatch(changeCategoryFilter(filterValue));
    dispatch(fetchRecipes());
  };
  const handleIngredientChange = (e) => {
    const filterValue = e.target.value;
    dispatch(changeIngredientFilter(filterValue));
    dispatch(fetchRecipes());
  };

  return (
    <>
      <div className="filters-container">
        <div className="filters-row">
          <span className="filters__count">96 recipes</span>
          <div className="filters-inputs-container">
            <form className="filters-form">
              <button type="reset" onClick={handleResetClick}>
                Reset filters
              </button>
              <select
                value={category}
                className="filter-input-category"
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
                value={ingredient}
                className="filter-input-ingredient"
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
          <IconButton></IconButton>
          {isModalOpen && (
            <div
              className="filters__modal-overlay"
              onClick={handleOverlayClick}
              role="dialog"
              aria-modal="true"
            >
              <div className="filters__modal">
                <button
                  className="filters__close-btn"
                  aria-label="Close filters"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
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
                <form className="filters__form">
                  <label>
                    Category
                    <select name="category">{/* ... */}</select>
                  </label>
                  <label>
                    Ingredient
                    <select name="ingredient">{/* ... */}</select>
                  </label>
                  <button type="button" className="filters__reset-btn">
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
