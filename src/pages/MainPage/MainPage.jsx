import Filter from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipesList/RecipesList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Pagination from "../../components/Pagination/Pagination";

import SearchBox from "../../components/SearchBox/SearchBox";

import css from "./MainPage.module.css";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../redux/recipes/operations";


export default function MainPage() {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch); // used to remove dependencies from effect

  useEffect(() => {
    dispatchRef.current(fetchRecipes());
  }, []);

  return (
    <>
      <SearchBox />
      <Filter />
      <RecipesList />
      <LoadMoreBtn />
      <Pagination />
    </>
  );
}
