import Filter from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipesList/RecipesList";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox"

export default function MainPage() {
  return (
    <>
      <SearchBox/>
      <Filter />
      <RecipesList />
      <RecipeCard />
      <LoadMoreBtn />
      <Pagination />
    </>
  );
}
