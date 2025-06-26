import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from './AuthNav.module.css'

export default function AuthNav() {

  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.nav}>
      <NavLink to="/register" className={getLinkStyles}>
        Register
      </NavLink>
      <NavLink to="/login" className={getLinkStyles}>
        Log In
      </NavLink>
    </nav>
  );
}
