import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./ProfileNavigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function ProfileNavigation() {

  
  return (
    <nav className={css.nav}>
      <NavLink className={buildLinkClass}  to="/profile/own">
        My Recipes
      </NavLink>
      
        <NavLink className={buildLinkClass}  to="/profile/favorites">
          Saved Recipes
        </NavLink>
    </nav>
  );
}