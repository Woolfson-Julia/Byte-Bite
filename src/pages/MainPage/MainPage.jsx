import Filter from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipesList/RecipesList";
// import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
// import Pagination from "../../components/Pagination/Pagination";

import SearchBox from "../../components/SearchBox/SearchBox";
import { selectFilter } from "../../redux/filters/selectors";
import { resetFilters } from "../../redux/filters/slice";
import { useSelector } from "react-redux";
import css from "./MainPage.module.css";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { fetchRecipes } from "../../redux/recipes/operations";

export default function MainPage() {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch); // used to remove dependencies from effect
  const searchValue = useSelector(selectFilter);

  useEffect(() => {
    dispatchRef.current(resetFilters());
    // dispatchRef.current(fetchRecipes());

    return () => {
      dispatchRef.current(resetFilters());
    };
  }, []);

  return (
    <>
      <SearchBox />
      <div className="section">
        <div className="container">
          <h2 className={css.title}>
            {searchValue ? `Search results for "${searchValue}"` : "Recipes"}
          </h2>
          <Filter />
          <RecipesList />
          {/* <LoadMoreBtn /> */}
          {/* <Pagination /> */}
        </div>
      </div>
    </>
  );
}
