import Filter from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipesList/RecipesList";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Pagination from "../../components/Pagination/Pagination";

import css from './MainPage.module.css'

export default function AuthPage() {
  return (
    <>
      <Filter />
      <RecipesList />
      <RecipeCard />
      <LoadMoreBtn />
      <Pagination />
    </>
  );
}
