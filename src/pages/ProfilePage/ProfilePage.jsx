import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import Filters from "../../components/Filters/Filters";
import css from './ProfilePage.module.css';
import { Outlet } from "react-router-dom";

export default function ProfilePage() {
  return (
    <div className="section">
      <div className="container">
        <h2 className={css.title}>My profile</h2>
        <ProfileNavigation />
        <Filters />
        <Outlet /> 
      </div>
    </div>
  );
}
