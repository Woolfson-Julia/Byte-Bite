import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import Filters from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipesList/RecipesList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import css from './ProfilePage.module.css'

export default function AuthPage() {
  return (
    <>
      <ProfileNavigation />
      <Filters />
      <RecipesList />
      <LoadMoreBtn />
    </>
  );
}
