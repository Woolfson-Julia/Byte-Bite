import Filter from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipesList/RecipesList";
// import Loader from "../../components/Loader/Loader"
import SearchBox from "../../components/SearchBox/SearchBox";
import { selectFilter } from "../../redux/filters/selectors";
import { resetFilters } from "../../redux/filters/slice";
import css from "./MainPage.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {selectRecipesLoading} from "../../redux/recipes/selectors"


export default function MainPage() {
  const dispatch = useDispatch();

  const searchValue = useSelector(selectFilter);
  // const isLoading = useSelector(selectRecipesLoading);

  useEffect(() => {
    dispatch(resetFilters());
    return () => dispatch(resetFilters());
  }, [dispatch]);
  return (
    <>
      <SearchBox />
      <div className="section">
        <div className="container">
          <h2 className={css.title}>
            {searchValue ? `Search results for "${searchValue}"` : "Recipes"}
          </h2>
          <Filter />
          {/* {isLoading && searchValue ? <Loader /> : <RecipesList />} */}
          <RecipesList />
        </div>
      </div>
    </>
  );
}
