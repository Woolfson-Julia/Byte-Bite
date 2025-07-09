import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import Filters from "../../components/Filters/Filters";
import Loader from "../../components/Loader/Loader";
import css from './ProfilePage.module.css';
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecipesLoading } from "../../redux/recipes/selectors";
import { selectFilter } from "../../redux/filters/selectors";


export default function ProfilePage() {

  const searchValue = useSelector(selectFilter);
  const isLoading = useSelector(selectRecipesLoading);

  return (
    <div className="section">
      <div className="container">
        <h2 className={css.title}>My profile</h2>
        <ProfileNavigation />
        <Filters />
        {isLoading && searchValue ? <Loader /> : <Outlet />}
      </div>
    </div>
  );
}
