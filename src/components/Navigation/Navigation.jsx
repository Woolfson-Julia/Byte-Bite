import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation({ onLinkClick }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  
  return (
    <nav className={css.nav}>
      <NavLink className={buildLinkClass} onClick={onLinkClick} to="/">
        Recipes
      </NavLink>
      {isLoggedIn && (
        <NavLink className={buildLinkClass} onClick={onLinkClick} to="/profile/favorites">
          My Profile
        </NavLink>
      )}
    </nav>
  );
}
